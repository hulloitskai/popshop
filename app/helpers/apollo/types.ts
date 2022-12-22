import { relayStylePagination } from "@apollo/client/utilities";

import introspection from "./introspection.generated";
import type { StrictTypedTypePolicies } from "./clientHelpers.generated";

export const typePolicies: StrictTypedTypePolicies = {
  Currency: {
    keyFields: ["code"],
  },
  Account: {
    fields: {
      orders: relayStylePagination(),
    },
  },
};

export const { possibleTypes } = introspection;