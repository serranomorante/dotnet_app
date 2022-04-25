using Microsoft.AspNetCore.Mvc;

[ApiController]
public class ProductController : ControllerBase {
    private readonly ILogger<ProductController> _logger;
    private readonly IProductService _productService;

    public ProductController(ILogger<ProductController> logger, IProductService productService) {
        _logger = logger;
        _productService = productService;
    }

    [HttpGet("/api/product")]
    public ActionResult GetProduct() {
        _logger.LogInformation("Getting all products");
        var products = _productService.GetAllProducts();

        var productViewModel = products.Select(ProductMapper.SerializeProductModel);

        return Ok(productViewModel);
    }

    [HttpPost("/api/product")]
    public ActionResult CreateProduct([FromBody] ProductModel product) {
        _logger.LogInformation("Creating new product...");
        var productData = ProductMapper.SerializeProductModel(product);
        var newProduct = _productService.CreateProduct(productData);
        return Ok(newProduct);
    }

    [HttpPatch("/api/product/{id}")]
    public ActionResult ArchiveProduct(int id) {
        _logger.LogInformation("Archiving product");
        var archiveResult = _productService.ArchiveProduct(id);
        return Ok(archiveResult);
    }
}