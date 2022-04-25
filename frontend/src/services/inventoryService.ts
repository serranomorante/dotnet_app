import axios from "axios";
import axiosInstance from "../utils/axios";

/**
 * Inventory Service
 * Provides UI business logic associated with product inventory
 */
export class InventoryService {
  public async getInventory(): Promise<any> {
    try {
      const url = "/customer";
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error.response?.data;
      }

      throw error;
    }
  }
}
