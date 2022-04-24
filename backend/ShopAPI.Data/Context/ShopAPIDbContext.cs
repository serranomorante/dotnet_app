using Microsoft.EntityFrameworkCore;

public class ShopAPIDbContext: DbContext {
    public ShopAPIDbContext() {}

    public ShopAPIDbContext(DbContextOptions options) : base(options) {}

    public virtual DbSet<Customer> Customers { get; set; }
    public virtual DbSet<CustomerAddress> CustomerAddesses { get; set; }
    public virtual DbSet<Product> Products { get; set; }
    public virtual DbSet<ProductInventory> ProductInventories { get; set; }
    public virtual DbSet<ProductInventorySnapshot> ProductInventorySnapshots { get; set; }
    public virtual DbSet<SalesOrder> SalesOrders { get; set; }
    public virtual DbSet<SalesOrderItem> SalesOrderItems { get; set; }
}