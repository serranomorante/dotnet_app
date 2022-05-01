import { ICustomer } from "./ICustomer";
import { IProduct } from "./IProduct";

export interface ISalesOrder {
  id?: number;
  createdOn?: Date;
  updatedOn?: Date;
  customer: ICustomer;
  salesOrderItems: ISalesOrderItem[];
  isPaid: boolean;
}

export interface ISalesOrderItem {
  id?: number;
  quantity: number;
  product: IProduct;
}
