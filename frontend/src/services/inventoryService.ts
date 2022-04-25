import axios from "axios";
import { IProductInventory } from "../@types/IProduct";
import axiosInstance from "../utils/axios";

/**
 * Inventory Service
 * Provides UI business logic associated with product inventory
 */
export class InventoryService {
  public async getInventory(): Promise<IProductInventory[]> {
    try {
      const url = "/inventory";
      const response = await axiosInstance.get<IProductInventory[]>(url);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error.response?.data;
      }

      throw error;
    }
  }
}
