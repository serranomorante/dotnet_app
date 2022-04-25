using Microsoft.EntityFrameworkCore;

public class CustomerService : ICustomerService {
    private readonly ShopAPIDbContext _db;

    public CustomerService(ShopAPIDbContext dbContext)
    {
        _db = dbContext;
    }

    /// <summary>
    /// Returns a list of Customers from the database
    /// </summary>
    /// <returns></returns>
    public List<Customer> GetAllCustomers() {
        return _db.Customers
            .Include(customer => customer.PrimaryAddress)
            .OrderBy(customer => customer.LastName)
            .ToList();
    }

    /// <summary>
    /// Adds a new customer record
    /// </summary>
    /// <param name="customer"></param>
    /// <returns></returns>
    public ServiceResponse<Customer> CreateCustomer(Customer customer) {
        try {
            _db.Customers.Add(customer);
            _db.SaveChanges();
            return new ServiceResponse<Customer> {
                IsSuccess = true,
                Message = "New customer added",
                Time = DateTime.UtcNow,
                Data = customer
            };
        } catch (Exception e) {
            return new ServiceResponse<Customer> {
                IsSuccess = false,
                Message = e.StackTrace,
                Time = DateTime.UtcNow,
                Data = customer
            };
        }
    }

    /// <summary>
    /// Deletes a customer record
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    public ServiceResponse<bool> DeleteCustomer(int id) {
        var customer = _db.Customers.Find(id);
        var now = DateTime.UtcNow;

        if (customer == null) {
            return new ServiceResponse<bool> {
                Time = now,
                IsSuccess = false,
                Message = "Customer to delete not found!",
                Data = false
            };
        }

        try {
            _db.Customers.Remove(customer);
            _db.SaveChanges();

            return new ServiceResponse<bool> {
                IsSuccess = true,
                Message = "Customer created",
                Time = DateTime.UtcNow,
                Data = true
            };

        } catch (Exception e) {
            return new ServiceResponse<bool> {
                IsSuccess = false,
                Message = e.StackTrace,
                Time = DateTime.UtcNow,
                Data = false
            };
        }

    }

    /// <summary>
    /// Gets a customer record by primary key
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    public Customer GetById(int id) {
        return _db.Customers.Find(id);
    }
}