using System.ComponentModel.DataAnnotations;

public class CustomerAddress {
    public int Id { get; set; }
    public DateTime CreatedOn { get; set; }
    public DateTime UpdatedOn { get; set; }
    [MaxLength(255)]
    public string AddressLine1 { get; set; }
    [MaxLength(255)]
    public string AddressLine2 { get; set; }
    [MaxLength(127)]
    public string City { get; set; }
    [MaxLength(127)]
    public string State { get; set; }
    [MaxLength(127)]
    public string PostalCode { get; set; }
    [MaxLength(127)]
    public string Country { get; set; }
}