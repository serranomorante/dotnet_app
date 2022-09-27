using Microsoft.EntityFrameworkCore;

public class ShopAPIDbContext: DbContext {
    public ShopAPIDbContext() {}

    public ShopAPIDbContext(DbContextOptions options) : base(options) {}

    public virtual DbSet<Customer> Customers => Set<Customer>();
    public virtual DbSet<CustomerAddress> CustomerAddesses => Set<CustomerAddress>();
    public virtual DbSet<Product> Products => Set<Product>();
    public virtual DbSet<ProductInventory> ProductInventories => Set<ProductInventory>();
    public virtual DbSet<ProductInventorySnapshot> ProductInventorySnapshots => Set<ProductInventorySnapshot>();
    public virtual DbSet<SalesOrder> SalesOrders => Set<SalesOrder>();
    public virtual DbSet<SalesOrderItem> SalesOrderItems => Set<SalesOrderItem>();
}