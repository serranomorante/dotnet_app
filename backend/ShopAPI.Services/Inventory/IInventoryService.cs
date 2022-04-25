public interface IInventoryService {
    public List<ProductInventory> GetCurrentInventory();
    public ServiceResponse<ProductInventory> UpdateUnitsAvailable(int id, int adjustment);
    public ProductInventory GetByProductId(int productId);
    public void CreateSnapshot();
    public List<ProductInventorySnapshot> GetSnapshotHistory();
}