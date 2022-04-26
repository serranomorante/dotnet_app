import { useQuery } from "react-query";

import { OrderService } from "../../services/orderService";
import SalesOrderTable from "../data_display/SalesOrderTable";

/**
 * Customer page component
 * @returns
 */
export default function SalesOrder() {
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
      <SalesOrderTable salesOrderData={ordersQuery.data} />
    </div>
  );
}
