public interface IProductService {
    List<Product> GetAllProducts();
    Product GetProductById(int id);
    ServiceResponse<Product> CreateProduct(Product product);
    ServiceResponse<Product> ArchiveProduct(int id);
}