using FluentAssertions;
using Xunit;
using System;
using System.Linq;

namespace ShopAPI.Tests;

public class TestCustomerService : IClassFixture<TestDatabaseFixture>
{
    public TestCustomerService(TestDatabaseFixture fixture) => Fixture = fixture;

    public TestDatabaseFixture Fixture { get; }

    [Fact]
    public void CustomerService_GetsAllCustomers_GivenTheyExists()
    {
        // Arrange
        // --------------------
        using var context = Fixture.CreateContext();
        var sut = new CustomerService(context);

        // Act
        // --------------------
        var allCustomers = sut.GetAllCustomers();

        // Assert
        // --------------------
        allCustomers.Count.Should().Be(2);
    }

    [Fact]
    public void CustomerService_CreatesCustomer_GivenNewCustomerObject() {
        // Arrange
        // --------------------
        var now = DateTime.UtcNow;
        using var context = Fixture.CreateContext();
        var sut = new CustomerService(context);
        var expectedId = 9999;

        // Act
        // --------------------
        sut.CreateCustomer(new Customer {
            Id = expectedId,
            CreatedOn = now,
            UpdatedOn = now,
            FirstName = "Aldo",
            LastName = "Raine",
            PrimaryAddress = new CustomerAddress {
                Id = 123456789,
                CreatedOn = now,
                UpdatedOn = now,
                AddressLine1 = "Test address 1",
                AddressLine2 = "Test address 1",
                City = "Test city",
                State = "Test state",
                PostalCode = "Test postal code",
                Country = "Test country"
            }
        });

        // Assert
        // --------------------
        context.Customers.Count().Should().Be(3);
        context.Customers.OrderBy(customer => customer.Id).Last().Id.Should().Be(expectedId);
    }
}