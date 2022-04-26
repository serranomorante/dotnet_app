import axios from "axios";
import { ServiceResponse } from "../@types/common";
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

  public async updateInventory(
    productId: number,
    adjustment: number
  ): Promise<ServiceResponse<IProductInventory>> {
    try {
      const url = "/inventory";
      const data = { productId, adjustment };
      const response = await axiosInstance.patch(url, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error.response?.data;
      }

      throw error;
    }
  }
}
