using System;
using Microsoft.EntityFrameworkCore;


public class TestDatabaseFixture
{
    private readonly string ConnectionString;
    private static readonly object _lock = new();
    private static bool _databaseInitialized;

    public TestDatabaseFixture()
    {
        ConnectionString = Environment.GetEnvironmentVariable("TestDB") ?? "";
        var now = DateTime.UtcNow;
        lock (_lock)
        {
            if (!_databaseInitialized)
            {
                using (var context = CreateContext())
                {
                    context.Database.EnsureDeleted();
                    context.Database.EnsureCreated();

                    context.AddRange(
                        new Customer {
                            Id = 1,
                            CreatedOn = now,
                            UpdatedOn = now,
                            FirstName = "Aldo",
                            LastName = "Raine",
                            PrimaryAddress = new CustomerAddress {
                                Id = 1,
                                CreatedOn = now,
                                UpdatedOn = now,
                                AddressLine1 = "Test address 1",
                                AddressLine2 = "Test address 1",
                                City = "Test city",
                                State = "Test state",
                                PostalCode = "Test postal code",
                                Country = "Test country"
                            }
                        },
                        new Customer {
                            Id = 2,
                            CreatedOn = now,
                            UpdatedOn = now,
                            FirstName = "Bridget",
                            LastName = "von Hammersmark",
                            PrimaryAddress = new CustomerAddress {
                                Id = 2,
                                CreatedOn = now,
                                UpdatedOn = now,
                                AddressLine1 = "Test address 1",
                                AddressLine2 = "Test address 1",
                                City = "Test city",
                                State = "Test state",
                                PostalCode = "Test postal code",
                                Country = "Test country"
                            }
                        }
                    );
                    context.SaveChanges();
                }

                _databaseInitialized = true;
            }
        }
    }

    public ShopAPIDbContext CreateContext()
        => new ShopAPIDbContext(
            new DbContextOptionsBuilder<ShopAPIDbContext>()
                .UseNpgsql(ConnectionString)
                .Options);
}