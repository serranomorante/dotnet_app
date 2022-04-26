import * as React from "react";
import { useQuery } from "react-query";
import { CustomerService } from "../../services/customerService";
import { InvoiceService } from "../../services/invoiceService";
import Select from "react-select";
import { OrderService } from "../../services/orderService";
import { ProductService } from "../../services/productService";
import { ICustomer } from "../../@types/ICustomer";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useMachine } from "@xstate/react";
import generateInvoiceMachine from "../../fsm/generateInvoiceMachine";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { IProduct } from "../../@types/IProduct";
import AddOrderLineForm, {
  addOrderLineSchema,
  IAddOrderLineFormInputs,
} from "../forms/AddOrderLineForm";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "../actions/SubmitButton";
import InvoiceTable from "../data_display/InvoiceTable";
import { Navigate } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 22,
    marginBottom: 10,
  },
  pos: {
    marginBottom: 12,
  },
  select: {
    zIndex: 1000,
  },
});

export interface OptionType {
  label: string;
  value: number;
}

/**
 * Invoice view component
 * @returns
 */
export default function Invoice() {
  const classes = useStyles();
  const [state, send] = useMachine(generateInvoiceMachine);
  const invoiceService = new InvoiceService();
  const orderService = new OrderService();
  const customerService = new CustomerService();
  const productService = new ProductService();
  const ordersQuery = useQuery(["get-orders"], orderService.getOrders);
  const productsQuery = useQuery(["get-products"], productService.getProducts);
  const customersQuery = useQuery(
    ["get-customers"],
    customerService.getCustomers
  );
  const addOrderLineFormMethods = useForm<IAddOrderLineFormInputs>({
    resolver: zodResolver(addOrderLineSchema),
  });

  function handleAddOrderLine(data: IAddOrderLineFormInputs) {
    const product = productsQuery.data?.find(
      (product) => product.id === data.product
    );
    const orderItem = { product, quantity: Number(data.quantity) };
    addOrderLineFormMethods.reset();
    send("ADD_ORDER_ITEM", { orderItem: orderItem });
  }

  const prepareCustomers = React.useCallback(
    (data: ICustomer[] | undefined) => {
      if (typeof data === "undefined") {
        return [];
      }
      return data.map<OptionType>((customer) => ({
        label: `${customer.firstName} ${customer.lastName}`,
        value: customer.id as number,
      }));
    },
    [customersQuery.data]
  );

  const prepareProducts = React.useCallback(
    (data: IProduct[] | undefined) => {
      if (typeof data === "undefined") {
        return [];
      }
      return data.map<OptionType>((product) => ({
        label: product.name,
        value: product.id as number,
      }));
    },
    [productsQuery.data]
  );

  if (ordersQuery.isLoading) {
    return <div>Cargando...</div>;
  }

  if (ordersQuery.isError) {
    return <div>Ocurrió un error</div>;
  }

  if (typeof ordersQuery.data === "undefined") {
    return null;
  }

  if (state.matches("invoiceGenerationDone")) {
    return <Navigate to="/orders" />;
  }

  return (
    <div>
      <Paper elevation={1}>
        <Box p={2}>
          <Typography className={classes.title} variant="h1">
            {state.matches("waitingForCustomerSelection") &&
              "Seleccione un cliente"}
            {state.matches("addingOrderItems") && "Añada productos a la orden"}
          </Typography>
          {state.matches("waitingForCustomerSelection") && (
            <Select
              className={classes.select}
              onChange={(data) =>
                send("SELECT_CUSTOMER", {
                  customerId: data!.value as number,
                })
              }
              options={prepareCustomers(customersQuery.data) || []}
            />
          )}
          <FormProvider {...addOrderLineFormMethods}>
            {state.matches("addingOrderItems") && (
              <>
                <AddOrderLineForm
                  options={prepareProducts(productsQuery.data) || []}
                />
                <SubmitButton formSubmit={handleAddOrderLine} />
              </>
            )}
          </FormProvider>
        </Box>
      </Paper>
      {state.matches("waitingForCustomerSelection") && (
        <Button
          color="primary"
          variant="contained"
          onClick={() => send("GO_TO_PRODUCT_SELECTION")}
          disabled={!Boolean(state.context.customerId)}
        >
          Siguiente
        </Button>
      )}
      {state.matches("addingOrderItems") &&
        state.context.lineItems.length > 0 && (
          <InvoiceTable invoiceData={state.context.lineItems} />
        )}
      {state.matches("addingOrderItems") && (
        <Button
          color="primary"
          variant="contained"
          onClick={() => send("SUBMIT_INVOICE")}
          disabled={state.context.lineItems.length === 0}
        >
          Finalizar orden
        </Button>
      )}
    </div>
  );
}
