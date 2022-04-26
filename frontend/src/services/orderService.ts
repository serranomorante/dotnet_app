import axios from "axios";
import { ISalesOrder } from "../@types/ISalesOrder";
import axiosInstance from "../utils/axios";

export class OrderService {
  public async getOrders(): Promise<ISalesOrder[]> {
    try {
      const url = "/order";
      const response = await axiosInstance.get<ISalesOrder[]>(url);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error.response?.data;
      }
      throw error;
    }
  }
}
