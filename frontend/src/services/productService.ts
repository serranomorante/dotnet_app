import axios from "axios";
import { ServiceResponse } from "../@types/common";
import { IProduct } from "../@types/IProduct";
import axiosInstance from "../utils/axios";

export class ProductService {
  public async createProduct(
    product: IProduct
  ): Promise<ServiceResponse<IProduct>> {
    try {
      const url = "/product";
      const response = await axiosInstance.post<ServiceResponse<IProduct>>(
        url,
        product
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
