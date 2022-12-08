import * as Types from 'app/queries/types.generated';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type AccountEditPageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AccountEditPageQuery = (
  { __typename?: 'Query' }
  & { viewer: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'name' | 'email' | 'unconfirmedEmail'>
  )> }
);

export type AccountEditPageViewerFragment = (
  { __typename?: 'User' }
  & Pick<Types.User, 'name' | 'email' | 'unconfirmedEmail'>
);

export type AccountEmailFormQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AccountEmailFormQuery = (
  { __typename?: 'Query' }
  & { viewer: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'email' | 'unconfirmedEmail'>
  )> }
);

export type AccountSignInPageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AccountSignInPageQuery = (
  { __typename?: 'Query' }
  & { viewer: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'name'>
  )> }
);

export type AccountSignUpPageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AccountSignUpPageQuery = (
  { __typename?: 'Query' }
  & { viewer: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'name'>
  )> }
);

export type AccountUpdateMutationVariables = Types.Exact<{
  input: Types.AccountUpdateInput;
}>;


export type AccountUpdateMutation = (
  { __typename?: 'Mutation' }
  & { payload: (
    { __typename?: 'AccountUpdatePayload' }
    & { user: Types.Maybe<(
      { __typename?: 'User' }
      & Pick<Types.User, 'id'>
    )>, errors: Types.Maybe<Array<(
      { __typename?: 'ValidationError' }
      & Pick<Types.ValidationError, 'field' | 'message'>
    )>> }
  ) }
);

export type AppViewerFragment = (
  { __typename?: 'User' }
  & Pick<Types.User, 'id' | 'name'>
);

export type DashboardPageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type DashboardPageQuery = (
  { __typename?: 'Query' }
  & { viewer: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'name'>
  )> }
);

export type ErrorPageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ErrorPageQuery = (
  { __typename?: 'Query' }
  & { viewer: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'name'>
  )> }
);

export type HomePageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type HomePageQuery = (
  { __typename?: 'Query' }
  & { viewer: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'name'>
  )> }
);

export type TestFeedSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type TestFeedSubscription = (
  { __typename?: 'Subscription' }
  & Pick<Types.Subscription, 'testSubscription'>
);

export type TestMutationVariables = Types.Exact<{
  input: Types.TestMutationInput;
}>;


export type TestMutation = (
  { __typename?: 'Mutation' }
  & { testMutation: (
    { __typename?: 'TestMutationPayload' }
    & { model: Types.Maybe<(
      { __typename?: 'TestModel' }
      & Pick<Types.TestModel, 'id' | 'name' | 'birthday'>
    )>, errors: Types.Maybe<Array<(
      { __typename?: 'ValidationError' }
      & Pick<Types.ValidationError, 'field' | 'message'>
    )>> }
  ) }
);

export type TestPageQueryVariables = Types.Exact<{
  name: Types.Scalars['String'];
}>;


export type TestPageQuery = (
  { __typename?: 'Query' }
  & Pick<Types.Query, 'testEcho'>
  & { viewer: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'name'>
  )> }
);

export type WorkPageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type WorkPageQuery = (
  { __typename?: 'Query' }
  & { viewer: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'name'>
  )> }
);

export const AccountEditPageViewerFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountEditPageViewerFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"unconfirmedEmail"}}]}}]} as unknown as DocumentNode<AccountEditPageViewerFragment, unknown>;
export const AppViewerFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AppViewerFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<AppViewerFragment, unknown>;
export const AccountEditPageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AccountEditPageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountEditPageViewerFragment"}}]}}]}},...AppViewerFragment.definitions,...AccountEditPageViewerFragment.definitions]} as unknown as DocumentNode<AccountEditPageQuery, AccountEditPageQueryVariables>;
export const AccountEmailFormQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AccountEmailFormQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"unconfirmedEmail"}}]}}]}}]} as unknown as DocumentNode<AccountEmailFormQuery, AccountEmailFormQueryVariables>;
export const AccountSignInPageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AccountSignInPageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}}]}}]}},...AppViewerFragment.definitions]} as unknown as DocumentNode<AccountSignInPageQuery, AccountSignInPageQueryVariables>;
export const AccountSignUpPageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AccountSignUpPageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}}]}}]}},...AppViewerFragment.definitions]} as unknown as DocumentNode<AccountSignUpPageQuery, AccountSignUpPageQueryVariables>;
export const AccountUpdateMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AccountUpdateMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AccountUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"accountUpdate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<AccountUpdateMutation, AccountUpdateMutationVariables>;
export const DashboardPageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DashboardPageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}}]}}]}},...AppViewerFragment.definitions]} as unknown as DocumentNode<DashboardPageQuery, DashboardPageQueryVariables>;
export const ErrorPageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ErrorPageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}}]}}]}},...AppViewerFragment.definitions]} as unknown as DocumentNode<ErrorPageQuery, ErrorPageQueryVariables>;
export const HomePageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HomePageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}}]}}]}},...AppViewerFragment.definitions]} as unknown as DocumentNode<HomePageQuery, HomePageQueryVariables>;
export const TestFeedSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"TestFeedSubscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"testSubscription"}}]}}]} as unknown as DocumentNode<TestFeedSubscription, TestFeedSubscriptionVariables>;
export const TestMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TestMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TestMutationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"testMutation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"model"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<TestMutation, TestMutationVariables>;
export const TestPageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TestPageQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"testEcho"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]},{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}}]}}]}},...AppViewerFragment.definitions]} as unknown as DocumentNode<TestPageQuery, TestPageQueryVariables>;
export const WorkPageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WorkPageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}}]}}]}},...AppViewerFragment.definitions]} as unknown as DocumentNode<WorkPageQuery, WorkPageQueryVariables>;