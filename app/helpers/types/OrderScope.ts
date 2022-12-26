import { OrderScope } from "~/queries";

const OrderScopeLabels: Record<OrderScope, string> = {
  [OrderScope.PerOrder]: "Per order",
  [OrderScope.PerPerson]: "Per person",
  [OrderScope.PerUnit]: "Per unit",
};

const OrderScopeTerms: Record<OrderScope, string> = {
  [OrderScope.PerOrder]: "Once per order (e.g. for a service fee)",
  [OrderScope.PerPerson]: "Number of people (e.g. for a tour)",
  [OrderScope.PerUnit]: "Number of units (e.g. for an item)",
};

const OrderScopeOrdering: Record<OrderScope, number> = {
  [OrderScope.PerPerson]: 1,
  [OrderScope.PerUnit]: 2,
  [OrderScope.PerOrder]: 3,
};

export const orderScopeLabel = (orderscope: OrderScope): string =>
  OrderScopeLabels[orderscope];

export const orderScopeTerms = (orderscope: OrderScope): string =>
  OrderScopeTerms[orderscope];

export const orderScopeOrdering = (orderscope: OrderScope): number =>
  OrderScopeOrdering[orderscope];
