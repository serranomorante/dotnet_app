import * as React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { IProduct, IProductInventory } from "../../@types/IProduct";
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
import UpdateInventoryForm, {
  IUpdateInventoryFormInputs,
  OptionType,
  updateInventorySchema,
} from "../forms/UpdateInventoryForm";

/**
 * Inventory page component
 * @returns
 */
export default function Inventory() {
  const inventoryService = new InventoryService();
  const productService = new ProductService();
  const queryClient = useQueryClient();
  const addInventoryFormMethods = useForm<IProductFormInputs>({
    resolver: zodResolver(productFormSchema),
  });
  const updateInventoryFormMethods = useForm<IUpdateInventoryFormInputs>({
    resolver: zodResolver(updateInventorySchema),
  });

  const inventoryQuery = useQuery(
    ["get-inventory"],
    inventoryService.getInventory
  );

  const productQuery = useQuery(["product-list"], productService.getProducts);

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

  const updateInventory = useMutation<
    unknown,
    unknown,
    IUpdateInventoryFormInputs,
    void
  >(
    (data) => inventoryService.updateInventory(data.productId, data.adjustment),
    {
      onMutate: async (data) => {
        await queryClient.cancelQueries(["get-inventory"]);
        const inventory = queryClient.getQueryData<IProductInventory[]>([
          "get-inventory",
        ]);
        const optimisticInventory = produce(inventory, (draft) => {
          if (typeof draft === "undefined") {
            return;
          }
          const inventory = draft.find(
            (inventory) => inventory.product.id == data.productId
          );
          if (typeof inventory === "undefined") {
            return;
          }
          inventory.quantityOnHand = inventory.quantityOnHand + data.adjustment;
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

  const prepareProducts = React.useCallback(
    (data: IProduct[] | undefined) => {
      if (typeof data === "undefined") {
        return [];
      }
      return data.map<OptionType>((product) => ({
        label: product.name,
        value: product.id as number,
      }));
    },
    [productQuery.data]
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
      <FormProvider {...addInventoryFormMethods}>
        <Dialog<IProductFormInputs>
          clickableButtonText="Crear item"
          titleText="Crear item"
          messageText="Crea un nuevo producto"
          formSubmit={(data) => createProduct.mutate(data)}
        >
          <ProductForm />
        </Dialog>
      </FormProvider>
      <FormProvider {...updateInventoryFormMethods}>
        <Dialog<IUpdateInventoryFormInputs>
          clickableButtonText="Actualizar inventario"
          titleText="Actualizar inventario"
          messageText="Ingreso de inventario"
          formSubmit={(data) => updateInventory.mutate(data)}
        >
          <UpdateInventoryForm
            options={prepareProducts(productQuery.data) || []}
          />
        </Dialog>
      </FormProvider>

      <InventoryTable inventoryData={inventoryQuery.data} />
    </div>
  );
}
