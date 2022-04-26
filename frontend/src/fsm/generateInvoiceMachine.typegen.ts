// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    setCustomerId: "SELECT_CUSTOMER";
    addOrderItem: "ADD_ORDER_ITEM";
  };
  internalEvents: {
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingServices: {};
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | "waitingForCustomerSelection"
    | "addingOrderItems"
    | "generatingInvoice"
    | "invoiceGenerationDone";
  tags: never;
}
