public interface ICustomerService {
    List<Customer> GetAllCustomers();
    ServiceResponse<Customer> CreateCustomer(Customer customer);
    ServiceResponse<bool> DeleteCustomer(int id);
    Customer GetById(int id);
}