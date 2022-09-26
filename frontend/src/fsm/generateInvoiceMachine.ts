import produce from "immer";
import { createMachine } from "xstate";
import { ISalesOrderItem } from "../@types/ISalesOrder";

type TContext = {
  customerId: number | null;
  lineItems: ISalesOrderItem[];
};

type TEvent =
  | { type: "SELECT_CUSTOMER"; customerId: number }
  | { type: "ADD_ORDER_ITEM"; orderItem: ISalesOrderItem; currentStock: number }
  | { type: "CHANGE_CUSTOMER" }
  | { type: "GO_TO_PRODUCT_SELECTION" }
  | { type: "SUBMIT_INVOICE" }
  | { type: "INVOICE_GENERATED" };

const generateInvoiceMachine = createMachine(
  {
    tsTypes: {} as import("./generateInvoiceMachine.typegen").Typegen0,
    schema: {
      context: {} as TContext,
      events: {} as TEvent,
    },
    context: {
      customerId: null,
      lineItems: [],
    },
    initial: "waitingForCustomerSelection",
    states: {
      waitingForCustomerSelection: {
        on: {
          SELECT_CUSTOMER: {
            actions: "setCustomerId",
          },
          GO_TO_PRODUCT_SELECTION: {
            target: "addingOrderItems",
          },
        },
      },
      addingOrderItems: {
        on: {
          ADD_ORDER_ITEM: [
            {
              actions: "addOrderItem",
              cond: "stockIsAvailable",
              target: "addingOrderItems",
            },
            {
              target: ".outOfStockError",
            },
          ],
          SUBMIT_INVOICE: {
            target: "generatingInvoice",
          },
        },
        initial: "noError",
        states: {
          noError: {},
          outOfStockError: {},
        },
      },
      generatingInvoice: {
        on: {
          INVOICE_GENERATED: {
            target: "invoiceGenerationDone",
          },
        },
      },
      invoiceGenerationDone: {
        type: "final",
      },
    },
  },
  {
    actions: {
      setCustomerId: (ctx, event) => (ctx.customerId = event.customerId),
      addOrderItem: (ctx, event) => {
        const newLineItems = produce(ctx.lineItems, (draft) => {
          const existentLineItem = draft.find(
            (item) => item.product.id === event.orderItem.product.id
          );
          if (typeof existentLineItem === "undefined") {
            draft.push(event.orderItem);
            return;
          }
          existentLineItem.quantity += event.orderItem.quantity;
        });
        return (ctx.lineItems = newLineItems);
      },
    },
    guards: {
      stockIsAvailable: (_, event) =>
        event.orderItem.quantity <= event.currentStock,
    },
  }
);

export default generateInvoiceMachine;
