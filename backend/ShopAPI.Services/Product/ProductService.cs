public class ProductService : IProductService {
    private readonly ShopAPIDbContext _db;

    public ProductService(ShopAPIDbContext dbContext) {
        _db = dbContext;
    }

    /// <summary>
    /// Retrieves all products
    /// </summary>
    /// <returns></returns>
    public List<Product> GetAllProducts() {
        return _db.Products.ToList();
    }

    /// <summary>
    /// Retrieves a product by primary key
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    public Product GetProductById(int id) {
        return _db.Products.Find(id);
    }

    /// <summary>
    /// Adds a new product to the database
    /// </summary>
    /// <param name="product"></param>
    /// <returns></returns>
    public ServiceResponse<Product> CreateProduct(Product product) {
        try {
            _db.Products.Add(product);

        var newInventory = new ProductInventory {
            Product = product,
            QuantityOnHand = 0,
            IdealQuantity = 10
        };

        _db.ProductInventories.Add(newInventory);

        _db.SaveChanges();

        return new ServiceResponse<Product> {
            Data = product,
            Time = DateTime.UtcNow,
            Message = "Saved new product",
            IsSuccess = true
        };
        } catch (Exception e) {
            return new ServiceResponse<Product> {
                Data = product,
                Time = DateTime.UtcNow,
                Message = "Error saving new product",
                IsSuccess = true
            };
        }
    }

    /// <summary>
    /// Archives a Product by setting boolean IsArchived to true
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    public ServiceResponse<Product> ArchiveProduct(int id) {
        try {

            var product = _db.Products.Find(id);
            product.IsArchived = true;
            _db.SaveChanges();

            return new ServiceResponse<Product> {
                Data = product,
                Time = DateTime.UtcNow,
                Message = "Archived product",
                IsSuccess = true
            };
        } catch (Exception e) {
            return new ServiceResponse<Product> {
                Data = null,
                Time = DateTime.UtcNow,
                Message = e.StackTrace,
                IsSuccess = false
            };
        }
    }
}