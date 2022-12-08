// import { relayStylePagination } from "@apollo/client/utilities";

import introspection from "./introspection.generated";
import type { StrictTypedTypePolicies } from "./clientHelpers.generated";

export const typePolicies: StrictTypedTypePolicies = {
  Query: {
    fields: {},
  },
};

export const { possibleTypes } = introspection;
