import * as React from "react";
import { useMutation, useQuery } from "react-query";
import { CustomerService } from "../../services/customerService";
import { InvoiceService } from "../../services/invoiceService";
import Select from "react-select";
import { OrderService } from "../../services/orderService";
import { ProductService } from "../../services/productService";
import { ICustomer } from "../../@types/ICustomer";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
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
import { IInvoice } from "../../@types/IInvoice";
import { InventoryService } from "../../services/inventoryService";
import { ISalesOrderItem } from "../../@types/ISalesOrder";

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
    fontSize: "3em",
    marginBottom: 10,
  },
  indicator: {
    fontSize: "1.5em",
    marginBottom: 10,
  },
  pos: {
    marginBottom: 12,
  },
  select: {
    zIndex: 1000,
  },
  actionContainer: {
    display: "flex",
    marginBottom: 10,
  },
  formWrapper: {
    marginRight: 7,
  },
  paper: {
    marginBottom: 10,
  },
  formTitle: {
    display: "flex",
  },
  stock: {
    marginLeft: 4,
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
  const inventoryService = new InventoryService();
  const ordersQuery = useQuery(["get-orders"], orderService.getOrders);
  const productsQuery = useQuery(["get-products"], productService.getProducts);
  const customersQuery = useQuery(
    ["get-customers"],
    customerService.getCustomers
  );
  const inventoryQuery = useQuery(
    ["get-inventory"],
    inventoryService.getInventory
  );
  const addOrderLineFormMethods = useForm<IAddOrderLineFormInputs>({
    resolver: zodResolver(addOrderLineSchema),
  });
  const generateInvoice = useMutation<unknown, unknown, IInvoice, void>(
    (data) => invoiceService.generateInvoice(data),
    {
      onSuccess: () => {
        send("INVOICE_GENERATED");
      },
    }
  );

  /**
   * Get the available stock for a product
   * @param orderItem
   * @returns
   */
  function getProductStock(productId: number): number {
    if (typeof inventoryQuery.data === "undefined") return 0;

    const inventory = inventoryQuery.data.find(
      (inventory) => inventory.product.id == productId
    );

    if (typeof inventory === "undefined") return 0;

    return inventory.quantityOnHand;
  }

  /**
   * Get a product complete data from product id
   */
  function getProductData(productId: number): IProduct {
    const initialData = {
      description: "",
      isArchived: false,
      isTaxable: true,
      name: "",
      price: 0,
      createdOn: new Date(),
      updatedOn: new Date(),
    };

    if (typeof productsQuery.data === "undefined") return initialData;

    const product = productsQuery.data.find(
      (product) => product.id === productId
    );

    if (typeof product === "undefined") return initialData;

    return product;
  }

  /**
   * Get the current available stock.
   * Fallback to a stock of 0 in case something fails.
   */
  const currentStock = React.useMemo(() => {
    const productId = addOrderLineFormMethods.watch("product");
    if (typeof productId !== "number") return 0;

    const currentStock = getProductStock(productId);
    const currentOrderLineItem = state.context.lineItems.find(
      (lineItem) => lineItem.product.id === productId
    );
    const orderLineQty = currentOrderLineItem?.quantity || 0;
    if (currentStock - orderLineQty <= 0) return 0;
    return currentStock - orderLineQty;
  }, [addOrderLineFormMethods.watch()]);

  /**
   * Add order item to sales order
   * @param data
   * @returns
   */
  function handleAddOrderLine(data: IAddOrderLineFormInputs) {
    const orderItem = {
      product: getProductData(data.product as number),
      quantity: Number(data.quantity),
    };

    // send to machine
    const result = send("ADD_ORDER_ITEM", {
      orderItem: orderItem,
      currentStock,
    });
    if (result.matches("addingOrderItems.outOfStockError")) return;
    addOrderLineFormMethods.reset();
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

  React.useEffect(() => {
    if (state.matches("generatingInvoice")) {
      generateInvoice.mutate({
        customerId: state.context.customerId as number,
        lineItems: state.context.lineItems,
      });
    }
  }, [state]);

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
      {state.matches("addingOrderItems.outOfStockError") && (
        <Alert onClose={() => null} severity="error">
          ¡Stock no disponible!
        </Alert>
      )}

      <Typography className={classes.title} variant="h2" noWrap>
        Generar orden
      </Typography>

      <Paper className={classes.paper} elevation={1}>
        <Box p={2}>
          <div className={classes.formTitle}>
            <Typography className={classes.indicator} variant="h1">
              {state.matches("waitingForCustomerSelection") &&
                "Seleccione un cliente"}
              {state.matches("addingOrderItems") &&
                "Añada productos a la orden"}
            </Typography>
            {state.matches("addingOrderItems") &&
              (addOrderLineFormMethods.watch("product") as number) > 0 && (
                <Typography className={classes.stock}>
                  (Hay {currentStock} en stock)
                </Typography>
              )}
          </div>

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
              <React.Fragment>
                <AddOrderLineForm
                  options={prepareProducts(productsQuery.data) || []}
                />
                <SubmitButton formSubmit={handleAddOrderLine} />
              </React.Fragment>
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

      {state.matches("addingOrderItems") && state.context.lineItems.length > 0 && (
        <div className={classes.paper}>
          <Typography className={classes.title} variant="h2" noWrap>
            Su orden
          </Typography>
          <InvoiceTable invoiceData={state.context.lineItems} />
        </div>
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
