public static class CustomerMapper {
    /// <summary>
    /// Serializes a Customer data model into a CustomerModel view model
    /// </summary>
    /// <param name="customer"></param>
    /// <returns></returns>
    public static CustomerModel SerializeCustomer(Customer customer) {
        return new CustomerModel {
            Id = customer.Id,
            CreatedOn = customer.CreatedOn,
            UpdatedOn = customer.UpdatedOn,
            FirstName = customer.FirstName,
            LastName = customer.LastName,
            PrimaryAddress = MapCustomerAddress(customer.PrimaryAddress),
        };
    }

    /// <summary>
    /// Serializes a customer model view into a customer data model
    /// </summary>
    /// <param name="customer"></param>
    /// <returns></returns>
    public static Customer SerializeCustomer(CustomerModel customer) {
        return new Customer {
            Id = customer.Id,
            CreatedOn = customer.CreatedOn,
            UpdatedOn = customer.UpdatedOn,
            FirstName = customer.FirstName,
            LastName = customer.LastName,
            PrimaryAddress = MapCustomerAddress(customer.PrimaryAddress)
        };

    }

    /// <summary>
    /// Serializes a Customer Address data model into a CustomerAddressModel view model
    /// </summary>
    /// <param name="customer"></param>
    /// <returns></returns>
    public static CustomerAddressModel MapCustomerAddress(CustomerAddress address) {
        return new CustomerAddressModel {
            Id = address.Id,
            AddressLine1 = address.AddressLine1,
            AddressLine2 = address.AddressLine2,
            City = address.City,
            State = address.State,
            Country = address.Country,
            PostalCode = address.PostalCode,
            CreatedOn = address.CreatedOn,
            UpdatedOn = address.UpdatedOn
        };
    }

    /// <summary>
    /// Serializes a Customer Address view model into a CustomerAddressModel data model
    /// </summary>
    /// <param name="customer"></param>
    /// <returns></returns>
    public static CustomerAddress MapCustomerAddress(CustomerAddressModel address) {
        return new CustomerAddress {
            Id = address.Id,
            AddressLine1 = address.AddressLine1,
            AddressLine2 = address.AddressLine2,
            City = address.City,
            State = address.State,
            Country = address.Country,
            PostalCode = address.PostalCode,
            CreatedOn = address.CreatedOn,
            UpdatedOn = address.UpdatedOn
        };
    }
}