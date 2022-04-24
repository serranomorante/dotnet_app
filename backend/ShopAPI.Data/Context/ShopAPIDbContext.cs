using Microsoft.EntityFrameworkCore;

public class ShopAPIDbContext: DbContext {
    public ShopAPIDbContext() {}

    public ShopAPIDbContext(DbContextOptions options) : base(options) {}

    public virtual DbSet<Customer> Customers { get; set; }
    public virtual DbSet<CustomerAddress> CustomerAddesses { get; set; }
}