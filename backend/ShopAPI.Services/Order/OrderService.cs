public class OrderService : IOrderService {
    public List<SalesOrder> GetOrders() {
        throw new NotImplementedException();
    }
    public ServiceResponse<bool> GenerateInvoiceForOrder(SalesOrder order) {
        throw new NotImplementedException();
    }
    public ServiceResponse<bool> MarkFulfilled(int id) {
        throw new NotImplementedException();
    }
}