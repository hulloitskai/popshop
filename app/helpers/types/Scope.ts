import { Scope } from "~/queries";

const ScopeLabels: Record<Scope, string> = {
  [Scope.PerOrder]: "Per order",
  [Scope.PerPerson]: "Per person",
  [Scope.PerUnit]: "Per unit",
};

export const scopeLabel = (scope: Scope) => ScopeLabels[scope];
