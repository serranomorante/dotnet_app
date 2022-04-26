import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { useQuery } from "react-query";

import { OrderService } from "../../services/orderService";
import SalesOrderTable from "../data_display/SalesOrderTable";

const useStyles = makeStyles({
  title: {
    fontSize: "3em",
    marginBottom: 10,
  },
  actionContainer: {
    display: "flex",
    marginBottom: 10,
  },
  formWrapper: {
    marginRight: 7,
  },
});

/**
 * Customer page component
 * @returns
 */
export default function SalesOrder() {
  const classes = useStyles();
  const orderService = new OrderService();
  const ordersQuery = useQuery(["get-orders"], orderService.getOrders);

  if (ordersQuery.isLoading) {
    return <div>Cargando...</div>;
  }

  if (ordersQuery.isError) {
    return <div>Ocurrió un error</div>;
  }

  if (typeof ordersQuery.data === "undefined") {
    return null;
  }

  return (
    <div>
      <Typography className={classes.title} variant="h2" noWrap>
        Pedidos
      </Typography>
      <SalesOrderTable salesOrderData={ordersQuery.data} />
    </div>
  );
}
