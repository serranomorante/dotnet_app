import { useMutation, useQuery, useQueryClient } from "react-query";
import { IProductInventory } from "../../@types/IProduct";
import { InventoryService } from "../../services/inventoryService";
import { ProductService } from "../../services/productService";
import InventoryTable from "../data_display/InventoryTable";
import Dialog from "../utils/Dialog";
import produce from "immer";
import ProductForm, {
  IProductFormInputs,
  productFormSchema,
} from "../forms/ProductForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";

/**
 * Inventory page component
 * @returns
 */
export default function Inventory() {
  const inventoryService = new InventoryService();
  const productService = new ProductService();
  const queryClient = useQueryClient();
  const methods = useForm<IProductFormInputs>({
    resolver: zodResolver(productFormSchema),
  });

  const inventoryQuery = useQuery(
    ["get-inventory"],
    inventoryService.getInventory
  );

  const createProduct = useMutation<unknown, unknown, IProductFormInputs, void>(
    (data) => productService.createProduct(data),
    {
      onMutate: async (data) => {
        await queryClient.cancelQueries(["get-inventory"]);
        const inventory = queryClient.getQueryData<IProductInventory[]>([
          "get-inventory",
        ]);
        const optimisticInventory = produce(inventory, (draft) => {
          const newInventoryItem: IProductInventory = {
            id: 999,
            idealQuantity: 0,
            quantityOnHand: 10,
            product: data,
          };
          draft?.push(newInventoryItem);
        });

        if (typeof optimisticInventory === "undefined") {
          return;
        }

        queryClient.setQueryData<IProductInventory[]>(
          ["get-inventory"],
          optimisticInventory
        );
      },
      onSettled: () => {
        queryClient.invalidateQueries(["get-inventory"]);
      },
    }
  );

  if (inventoryQuery.isLoading) {
    return <div>Cargando...</div>;
  }

  if (inventoryQuery.isError) {
    return <div>Ocurrió un error</div>;
  }

  if (typeof inventoryQuery.data === "undefined") {
    return null;
  }

  return (
    <div>
      <FormProvider {...methods}>
        <Dialog<IProductFormInputs>
          clickableButtonText="Crear item"
          titleText="Crear item"
          messageText="Crea un nuevo producto"
          formSubmit={(data) => createProduct.mutate(data)}
        >
          <ProductForm />
        </Dialog>
      </FormProvider>

      <InventoryTable inventoryData={inventoryQuery.data} />
    </div>
  );
}
