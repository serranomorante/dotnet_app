using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

public class InventoryService : IInventoryService {
    private readonly ShopAPIDbContext _db;
    private readonly ILogger<InventoryService> _logger;

    public InventoryService(ShopAPIDbContext dbContext, ILogger<InventoryService> logger)
    {
        _db = dbContext;
        _logger = logger;
    }

    /// <summary>
    /// Return all current inventory from the database
    /// </summary>
    /// <returns></returns>
    public List<ProductInventory> GetCurrentInventory() {
        return _db.ProductInventories
            .Include(pi => pi.Product)
            .Where(pi => !pi.Product.IsArchived)
            .ToList();
    }

    /// <summary>
    /// Updates number of units available of the provided product id
    /// Adjusts the QuantityOnHand by adjustment value
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    public ServiceResponse<ProductInventory> UpdateUnitsAvailable(int id, int adjustment) {
        var now = DateTime.UtcNow;

        try {
            var inventory = _db.ProductInventories
                .Include(inv => inv.Product)
                .First(inv => inv.Product.Id == id);

            inventory.QuantityOnHand += adjustment;

            try {
                CreateSnapshot();
            } catch (Exception e) {
                _logger.LogError("Error creating inventory snapshot");
                _logger.LogError(e.StackTrace);
            }

            _db.SaveChanges();

            return new ServiceResponse<ProductInventory> {
                IsSuccess = true,
                Message = $"Product {id} inventory adjusted",
                Time = now,
                Data = inventory
            };
        } catch {
            return new ServiceResponse<ProductInventory> {
                IsSuccess = false,
                Message = "Error updating product quantity on hand",
                Time = now,
                Data = null
            };
        }
    }
    
    public ProductInventory GetByProductId(int productId) {
        throw new NotImplementedException();
    }
    
    public void CreateSnapshot() {
        throw new NotImplementedException();
    }
    
    public List<ProductInventorySnapshot> GetSnapshotHistory() {
        throw new NotImplementedException();
    }
}