import { ApolloLink, HttpLink } from "@apollo/client";
import { split, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { RetryLink } from "@apollo/client/link/retry";
import { getOperationDefinition } from "@apollo/client/utilities";

import ActionCableLink from "graphql-ruby-client/subscriptions/ActionCableLink";

import { cable } from "~/helpers/cable";

export type ApolloLinkOptions = {
  readonly csrfToken: string;
};

export const createApolloLink = ({
  csrfToken,
}: ApolloLinkOptions): ApolloLink => {
  return from([
    new RetryLink(),
    createCSRFLink(csrfToken),
    createTerminatingLink(),
  ]);
};

const createTerminatingLink = (): ApolloLink => {
  const httpLink = createHttpLink();
  return createSubscriptionsLink(httpLink);
};

const createHttpLink = () => {
  const uri = requireMeta("graphql-url");
  return new HttpLink({ uri });
};

export const createSubscriptionsLink = (link: ApolloLink): ApolloLink => {
  const cableLink = new ActionCableLink({
    cable,
    channelName: "GraphQLChannel",
  });
  return split(
    ({ query }) => {
      const { operation } = getOperationDefinition(query) || {};
      return operation === "subscription";
    },
    cableLink,
    link,
  );
};

const createCSRFLink = (token: string): ApolloLink => {
  return setContext(async (operation, { headers }) => ({
    headers: {
      ...headers,
      ["X-CSRF-Token"]: token,
    },
  }));
};
