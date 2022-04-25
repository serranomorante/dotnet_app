public interface IOrderService {
    List<SalesOrder> GetOrders();
    ServiceResponse<bool> GenerateInvoiceForOrder(SalesOrder order);
    ServiceResponse<bool> MarkFulfilled(int id);
}