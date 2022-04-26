import axios from "axios";
import { IInvoice } from "../@types/IInvoice";
import axiosInstance from "../utils/axios";

export class InvoiceService {
  public async generateInvoice(invoice: IInvoice): Promise<void> {
    try {
      const url = "/invoice";
      const response = await axiosInstance.post<void>(url, invoice);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error.response?.data;
      }
      throw error;
    }
  }
}
