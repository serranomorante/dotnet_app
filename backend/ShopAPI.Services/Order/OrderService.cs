using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

public class OrderService : IOrderService {
    private readonly ShopAPIDbContext _db;
    private readonly ILogger<OrderService> _logger;
    private readonly IProductService _productService;
    private readonly IInventoryService _inventoryService;

    public OrderService(ShopAPIDbContext dbContext, ILogger<OrderService> logger, IProductService productService, IInventoryService inventoryService)
    {
        _db = dbContext;
        _logger = logger;
        _productService = productService;
        _inventoryService = inventoryService;
    }

    /// <summary>
    /// Gets all sales orders from the system
    /// </summary>
    /// <returns></returns>
    public List<SalesOrder> GetOrders() {
        return _db.SalesOrders
            .Include(so => so.Customer)
                .ThenInclude(customer => customer.PrimaryAddress)
            .Include(so => so.SalesOrderItems)
                .ThenInclude(item => item.Product)
            .ToList();
    }

    /// <summary>
    /// Creates an open sales order
    /// </summary>
    /// <param name="order"></param>
    /// <returns></returns>
    public ServiceResponse<bool> GenerateOpenOrder(SalesOrder order) {
        var now = DateTime.UtcNow;

        _logger.LogInformation("Generating new order");

        foreach(var item in order.SalesOrderItems) {
            if (item.Quantity > _inventoryService.GetByProductId(item.Product.Id).QuantityOnHand) {
                return new ServiceResponse<bool> {
                    IsSuccess = false,
                    Data = false,
                    Message = "Not enough stock",
                    Time = now
                };
            }

            item.Product = _productService
                .GetProductById(item.Product.Id);
            var inventoryId = _inventoryService
                .GetByProductId(item.Product.Id).Id;
            _inventoryService
                .UpdateUnitsAvailable(inventoryId, -item.Quantity);
        }

        try {
            _db.SalesOrders.Add(order);
            _db.SaveChanges();

            return new ServiceResponse<bool> {
                IsSuccess = true,
                Data = true,
                Message = "Open order created",
                Time = now
            };
        } catch (Exception e) {
            return new ServiceResponse<bool> {
                IsSuccess = false,
                Data = false,
                Message = e.StackTrace,
                Time = now
            };
        }
    }

    /// <summary>
    /// Marks an open order as paid
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    public ServiceResponse<bool> MarkFulfilled(int id) {
        var now = DateTime.UtcNow;
        var order = _db.SalesOrders.Find(id);
        order.UpdatedOn = now;
        order.IsPaid = true;

        try {
            _db.SalesOrders.Update(order);
            _db.SaveChanges();

            return new ServiceResponse<bool> {
                IsSuccess = true,
                Data = true,
                Message = $"Order {order.Id} closed: Invoice paid in full.",
                Time = now
            };
        } catch (Exception e) {
            return new ServiceResponse<bool> {
                IsSuccess = false,
                Data = false,
                Message = e.StackTrace,
                Time = now
            };
        }
    }
}