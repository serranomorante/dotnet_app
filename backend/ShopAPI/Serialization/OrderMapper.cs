/// <summary>
/// Handles mapping Order data models to and from related View Model
/// </summary>
public static class OrderMapper {
    /// <summary>
    /// Maps an InvoiceModel view model to a SalesOrder data model
    /// </summary>
    /// <param name="invoice"></param>
    /// <returns></returns>
    public static SalesOrder SerializerInvoiceToOrder(InvoiceModel invoice) {
        var salesOrderItems = invoice.LineItems
            .Select(item => new SalesOrderItem {
                Id = item.Id,
                Quantity = item.Quantity,
                Product = ProductMapper.SerializeProductModel(item.Product)
            }).ToList();

        return new SalesOrder {
            SalesOrderItems = salesOrderItems,
            CreatedOn = DateTime.UtcNow,
            UpdatedOn = DateTime.UtcNow
        };
    }

    /// <summary>
    /// Maps a collection of sales order to order models
    /// </summary>
    /// <param name="orders"></param>
    /// <returns></returns>
    public static List<OrderModel> SerializeOrdersToViewModels(IEnumerable<SalesOrder> orders) {
        return orders.Select(order => new OrderModel {
            Id = order.Id,
            CreatedOn = order.CreatedOn,
            UpdatedOn = order.UpdatedOn,
            SalesOrderItems = SerializeSalesOrderItems(order.SalesOrderItems),
            Customer = CustomerMapper.SerializeCustomer(order.Customer),
            IsPaid = order.IsPaid
        }).ToList();
    }

    /// <summary>
    /// Maps a collection of SalesOrderItems (data) to SalesOrderItemModels (view models)
    /// </summary>
    /// <param name="orderItems"></param>
    /// <returns></returns>
    private static List<SalesOrderItemModel> SerializeSalesOrderItems(IEnumerable<SalesOrderItem> orderItems) {
        return orderItems.Select(item => new SalesOrderItemModel {
            Id = item.Id,
            Quantity = item.Quantity,
            Product = ProductMapper.SerializeProductModel(item.Product)
        }).ToList();
    }
}