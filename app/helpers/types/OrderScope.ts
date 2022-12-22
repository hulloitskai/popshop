import { OrderScope } from "~/queries";

const OrderScopeLabels: Record<OrderScope, string> = {
  [OrderScope.PerOrder]: "Per order",
  [OrderScope.PerPerson]: "Per person",
  [OrderScope.PerUnit]: "Per unit",
};

const OrderScopeTerms: Record<OrderScope, string> = {
  [OrderScope.PerOrder]: "Once per order (e.g. for a processing fee)",
  [OrderScope.PerPerson]: "Number of people (e.g. for a tour)",
  [OrderScope.PerUnit]: "Number of units (e.g. for an item)",
};

const OrderScopeOrdering: Record<OrderScope, number> = {
  [OrderScope.PerPerson]: 1,
  [OrderScope.PerUnit]: 2,
  [OrderScope.PerOrder]: 3,
};

export const orderScopeLabel = (orderscope: OrderScope) =>
  OrderScopeLabels[orderscope];

export const orderScopeTerms = (orderscope: OrderScope) =>
  OrderScopeTerms[orderscope];

export const orderScopeOrdering = (orderscope: OrderScope) =>
  OrderScopeOrdering[orderscope];
