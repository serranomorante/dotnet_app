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
                CreateSnapshot(inventory);
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

    /// <summary>
    /// Get a ProductInventory instance by Product ID
    /// </summary>
    /// <param name="productId"></param>
    /// <returns></returns>
    public ProductInventory GetByProductId(int productId) {
        return _db.ProductInventories
            .Include(pi => pi.Product)
            .FirstOrDefault(pi => pi.Product.Id == productId);
    }

    /// <summary>
    /// Return Snapshot history for the previous 6 hours
    /// </summary>
    /// <returns></returns>
    public List<ProductInventorySnapshot> GetSnapshotHistory() {
        var earliest = DateTime.UtcNow - TimeSpan.FromHours(6);
        return _db.ProductInventorySnapshots
            .Include(snap => snap.Product)
            .Where(snap => snap.SnapshotTime > earliest && !snap.Product.IsArchived)
            .ToList();
    }

    /// <summary>
    /// Creates a Snapshot record using the provided ProductInventory instance
    /// </summary>
    /// <param name="inventory"></param>
    private void CreateSnapshot(ProductInventory inventory) {
        var now = DateTime.UtcNow;
        var snapshot = new ProductInventorySnapshot {
            SnapshotTime = now,
            Product = inventory.Product,
            QuantityOnHand = inventory.QuantityOnHand
        };

        _db.Add(snapshot);
    }
}