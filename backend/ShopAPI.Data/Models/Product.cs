using System.ComponentModel.DataAnnotations;


public class Product {
    public int Id { get; set; }
    public DateTime CreatedOn { get; set; }
    public DateTime UpdatedOn { get; set; }
    [MaxLength(255)]
    public string Name { get; set; }
    [MaxLength(500)]
    public string Description { get; set; }

    public decimal Price { get; set; }
    public bool IsTaxable { get; set; }
    public bool IsArchived { get; set; }
}