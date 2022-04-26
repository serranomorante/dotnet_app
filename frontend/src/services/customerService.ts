import axios from "axios";
import { ServiceResponse } from "../@types/common";
import { ICustomer } from "../@types/ICustomer";
import axiosInstance from "../utils/axios";

/**
 * Customer Service
 */
export class CustomerService {
  public async getCustomers(): Promise<ICustomer[]> {
    try {
      const url = "/customer";
      const response = await axiosInstance.get<ICustomer[]>(url);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error.response?.data;
      }

      throw error;
    }
  }

  public async createCustomer(
    customer: ICustomer
  ): Promise<ServiceResponse<ICustomer>> {
    try {
      const url = "/customer";
      const response = await axiosInstance.post<ServiceResponse<ICustomer>>(
        url,
        customer
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error.response?.data;
      }

      throw error;
    }
  }
}
