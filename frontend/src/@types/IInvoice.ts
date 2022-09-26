import { ISalesOrderItem } from "./ISalesOrder";

export interface IInvoice {
  customerId: number;
  lineItems: ISalesOrderItem[];
}
