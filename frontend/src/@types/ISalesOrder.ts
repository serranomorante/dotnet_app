import { ICustomer } from "./ICustomer";
import { IProduct } from "./IProduct";

export interface ISalesOrder {
  id?: number;
  createdOn?: Date;
  updatedOn?: Date;
  customer: ICustomer;
  salesOrderItems: ISalesOrderItem;
  isPaid: boolean;
}

interface ISalesOrderItem {
  id?: number;
  quantity: string;
  product: IProduct;
}
