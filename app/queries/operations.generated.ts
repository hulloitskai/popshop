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
      { __typename?: 'InputFieldError' }
      & Pick<Types.InputFieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type AppViewerFragment = (
  { __typename?: 'User' }
  & Pick<Types.User, 'id' | 'name'>
);

export type CurrencyAmountFieldCurrencyFragment = (
  { __typename?: 'Currency' }
  & Pick<Types.Currency, 'code' | 'exponent'>
);

export type CurrencyAmountFieldQueryVariables = Types.Exact<{
  currencyCode: Types.Scalars['String'];
}>;


export type CurrencyAmountFieldQuery = (
  { __typename?: 'Query' }
  & { currency: Types.Maybe<(
    { __typename?: 'Currency' }
    & Pick<Types.Currency, 'code' | 'exponent'>
  )> }
);

export type CurrencyCodeFieldCurrencyFragment = (
  { __typename?: 'Currency' }
  & Pick<Types.Currency, 'name' | 'code' | 'symbol'>
);

export type CurrencyCodeFieldQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CurrencyCodeFieldQuery = (
  { __typename?: 'Query' }
  & { currencies: Array<(
    { __typename?: 'Currency' }
    & Pick<Types.Currency, 'name' | 'code' | 'symbol'>
  )> }
);

export type DashboardPageProductFragment = (
  { __typename?: 'Product' }
  & Pick<Types.Product, 'url' | 'name' | 'description'>
);

export type DashboardPageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type DashboardPageQuery = (
  { __typename?: 'Query' }
  & { viewer: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'name'>
    & { primaryAccount: (
      { __typename?: 'Account' }
      & Pick<Types.Account, 'id'>
      & { products: Array<(
        { __typename?: 'Product' }
        & Pick<Types.Product, 'id' | 'url' | 'name' | 'description'>
      )> }
    ) }
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

export type OrderCardProductFragment = (
  { __typename?: 'Product' }
  & { prices: Array<(
    { __typename?: 'Price' }
    & Pick<Types.Price, 'id' | 'name' | 'amount' | 'currencyCode'>
  )> }
);

export type PriceFormFieldsPriceFragment = (
  { __typename?: 'Price' }
  & Pick<Types.Price, 'name' | 'scope' | 'amount'>
  & { units: Types.Maybe<(
    { __typename?: 'Units' }
    & Pick<Types.Units, 'plural'>
  )> }
);

export type ProductCardProductFragment = (
  { __typename?: 'Product' }
  & Pick<Types.Product, 'name' | 'description'>
);

export type ProductCreateMutationVariables = Types.Exact<{
  input: Types.ProductCreateInput;
}>;


export type ProductCreateMutation = (
  { __typename?: 'Mutation' }
  & { payload: (
    { __typename?: 'ProductCreatePayload' }
    & { product: Types.Maybe<(
      { __typename?: 'Product' }
      & Pick<Types.Product, 'id' | 'url'>
    )>, errors: Types.Maybe<Array<(
      { __typename?: 'InputFieldError' }
      & Pick<Types.InputFieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type ProductCreatePageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ProductCreatePageQuery = (
  { __typename?: 'Query' }
  & { viewer: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'name'>
  )> }
);

export type ProductEditPageQueryVariables = Types.Exact<{
  productId: Types.Scalars['ID'];
}>;


export type ProductEditPageQuery = (
  { __typename?: 'Query' }
  & { viewer: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'name'>
  )>, product: (
    { __typename?: 'Product' }
    & Pick<Types.Product, 'id' | 'name' | 'description' | 'currencyCode'>
    & { prices: Array<(
      { __typename?: 'Price' }
      & Pick<Types.Price, 'name' | 'scope' | 'amount'>
      & { units: Types.Maybe<(
        { __typename?: 'Units' }
        & Pick<Types.Units, 'plural'>
      )> }
    )> }
  ) }
);

export type ProductFormProductFragment = (
  { __typename?: 'Product' }
  & Pick<Types.Product, 'name' | 'description' | 'currencyCode'>
  & { prices: Array<(
    { __typename?: 'Price' }
    & Pick<Types.Price, 'name' | 'scope' | 'amount'>
    & { units: Types.Maybe<(
      { __typename?: 'Units' }
      & Pick<Types.Units, 'plural'>
    )> }
  )> }
);

export type ProductPageProductFragment = (
  { __typename?: 'Product' }
  & Pick<Types.Product, 'canEdit' | 'editUrl' | 'name' | 'description'>
  & { prices: Array<(
    { __typename?: 'Price' }
    & Pick<Types.Price, 'id' | 'name' | 'amount' | 'currencyCode'>
  )> }
);

export type ProductPageQueryVariables = Types.Exact<{
  productId: Types.Scalars['ID'];
}>;


export type ProductPageQuery = (
  { __typename?: 'Query' }
  & { viewer: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'name'>
  )>, product: (
    { __typename?: 'Product' }
    & Pick<Types.Product, 'id' | 'name' | 'description' | 'currencyCode' | 'canEdit' | 'editUrl'>
    & { prices: Array<(
      { __typename?: 'Price' }
      & Pick<Types.Price, 'id' | 'name' | 'scope' | 'amount' | 'currencyCode'>
      & { units: Types.Maybe<(
        { __typename?: 'Units' }
        & Pick<Types.Units, 'singular' | 'plural'>
      )> }
    )> }
  ) }
);

export type ProductUpdateMutationVariables = Types.Exact<{
  input: Types.ProductUpdateInput;
}>;


export type ProductUpdateMutation = (
  { __typename?: 'Mutation' }
  & { payload: (
    { __typename?: 'ProductUpdatePayload' }
    & { product: Types.Maybe<(
      { __typename?: 'Product' }
      & Pick<Types.Product, 'id' | 'url' | 'name'>
    )>, errors: Types.Maybe<Array<(
      { __typename?: 'InputFieldError' }
      & Pick<Types.InputFieldError, 'field' | 'message'>
    )>> }
  ) }
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
      { __typename?: 'InputFieldError' }
      & Pick<Types.InputFieldError, 'field' | 'message'>
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
export const CurrencyAmountFieldCurrencyFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CurrencyAmountFieldCurrencyFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Currency"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"exponent"}}]}}]} as unknown as DocumentNode<CurrencyAmountFieldCurrencyFragment, unknown>;
export const CurrencyCodeFieldCurrencyFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CurrencyCodeFieldCurrencyFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Currency"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}}]} as unknown as DocumentNode<CurrencyCodeFieldCurrencyFragment, unknown>;
export const ProductCardProductFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCardProductFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<ProductCardProductFragment, unknown>;
export const DashboardPageProductFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DashboardPageProductFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductCardProductFragment"}}]}},...ProductCardProductFragment.definitions]} as unknown as DocumentNode<DashboardPageProductFragment, unknown>;
export const PriceFormFieldsPriceFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PriceFormFieldsPriceFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Price"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"scope"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"units"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plural"}}]}}]}}]} as unknown as DocumentNode<PriceFormFieldsPriceFragment, unknown>;
export const ProductFormProductFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductFormProductFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"prices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PriceFormFieldsPriceFragment"}}]}}]}},...PriceFormFieldsPriceFragment.definitions]} as unknown as DocumentNode<ProductFormProductFragment, unknown>;
export const OrderCardProductFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OrderCardProductFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"prices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}}]}}]}}]} as unknown as DocumentNode<OrderCardProductFragment, unknown>;
export const ProductPageProductFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductPageProductFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"canEdit"}},{"kind":"Field","name":{"kind":"Name","value":"editUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"OrderCardProductFragment"}}]}},...OrderCardProductFragment.definitions]} as unknown as DocumentNode<ProductPageProductFragment, unknown>;
export const AccountEditPageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AccountEditPageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountEditPageViewerFragment"}}]}}]}},...AppViewerFragment.definitions,...AccountEditPageViewerFragment.definitions]} as unknown as DocumentNode<AccountEditPageQuery, AccountEditPageQueryVariables>;
export const AccountEmailFormQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AccountEmailFormQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"unconfirmedEmail"}}]}}]}}]} as unknown as DocumentNode<AccountEmailFormQuery, AccountEmailFormQueryVariables>;
export const AccountSignInPageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AccountSignInPageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}}]}}]}},...AppViewerFragment.definitions]} as unknown as DocumentNode<AccountSignInPageQuery, AccountSignInPageQueryVariables>;
export const AccountSignUpPageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AccountSignUpPageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}}]}}]}},...AppViewerFragment.definitions]} as unknown as DocumentNode<AccountSignUpPageQuery, AccountSignUpPageQueryVariables>;
export const AccountUpdateMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AccountUpdateMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AccountUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"accountUpdate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<AccountUpdateMutation, AccountUpdateMutationVariables>;
export const CurrencyAmountFieldQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CurrencyAmountFieldQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"currencyCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currency"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"currencyCode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CurrencyAmountFieldCurrencyFragment"}}]}}]}},...CurrencyAmountFieldCurrencyFragment.definitions]} as unknown as DocumentNode<CurrencyAmountFieldQuery, CurrencyAmountFieldQueryVariables>;
export const CurrencyCodeFieldQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CurrencyCodeFieldQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currencies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CurrencyCodeFieldCurrencyFragment"}}]}}]}},...CurrencyCodeFieldCurrencyFragment.definitions]} as unknown as DocumentNode<CurrencyCodeFieldQuery, CurrencyCodeFieldQueryVariables>;
export const DashboardPageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DashboardPageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"primaryAccount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"products"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"DashboardPageProductFragment"}}]}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}}]}}]}},...DashboardPageProductFragment.definitions,...AppViewerFragment.definitions]} as unknown as DocumentNode<DashboardPageQuery, DashboardPageQueryVariables>;
export const ErrorPageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ErrorPageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}}]}}]}},...AppViewerFragment.definitions]} as unknown as DocumentNode<ErrorPageQuery, ErrorPageQueryVariables>;
export const HomePageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HomePageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}}]}}]}},...AppViewerFragment.definitions]} as unknown as DocumentNode<HomePageQuery, HomePageQueryVariables>;
export const ProductCreateMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ProductCreateMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"productCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<ProductCreateMutation, ProductCreateMutationVariables>;
export const ProductCreatePageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProductCreatePageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}}]}}]}},...AppViewerFragment.definitions]} as unknown as DocumentNode<ProductCreatePageQuery, ProductCreatePageQueryVariables>;
export const ProductEditPageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProductEditPageQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"product"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductFormProductFragment"}}]}}]}},...AppViewerFragment.definitions,...ProductFormProductFragment.definitions]} as unknown as DocumentNode<ProductEditPageQuery, ProductEditPageQueryVariables>;
export const ProductPageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProductPageQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"product"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"prices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"scope"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"units"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"singular"}},{"kind":"Field","name":{"kind":"Name","value":"plural"}}]}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductPageProductFragment"}}]}}]}},...AppViewerFragment.definitions,...ProductPageProductFragment.definitions]} as unknown as DocumentNode<ProductPageQuery, ProductPageQueryVariables>;
export const ProductUpdateMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ProductUpdateMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProductUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"productUpdate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<ProductUpdateMutation, ProductUpdateMutationVariables>;
export const TestFeedSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"TestFeedSubscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"testSubscription"}}]}}]} as unknown as DocumentNode<TestFeedSubscription, TestFeedSubscriptionVariables>;
export const TestMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TestMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TestMutationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"testMutation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"model"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<TestMutation, TestMutationVariables>;
export const TestPageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TestPageQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"testEcho"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]},{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}}]}}]}},...AppViewerFragment.definitions]} as unknown as DocumentNode<TestPageQuery, TestPageQueryVariables>;
export const WorkPageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WorkPageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}}]}}]}},...AppViewerFragment.definitions]} as unknown as DocumentNode<WorkPageQuery, WorkPageQueryVariables>;