using FluentAssertions;
using Xunit;

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
}