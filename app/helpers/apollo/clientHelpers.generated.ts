import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type AccountKeySpecifier = ('canDelete' | 'canEdit' | 'id' | 'name' | 'owner' | 'products' | AccountKeySpecifier)[];
export type AccountFieldPolicy = {
	canDelete?: FieldPolicy<any> | FieldReadFunction<any>,
	canEdit?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	owner?: FieldPolicy<any> | FieldReadFunction<any>,
	products?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AccountUpdatePayloadKeySpecifier = ('clientMutationId' | 'errors' | 'user' | AccountUpdatePayloadKeySpecifier)[];
export type AccountUpdatePayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CurrencyKeySpecifier = ('code' | 'exponent' | 'name' | 'symbol' | CurrencyKeySpecifier)[];
export type CurrencyFieldPolicy = {
	code?: FieldPolicy<any> | FieldReadFunction<any>,
	exponent?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	symbol?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InputFieldErrorKeySpecifier = ('field' | 'message' | InputFieldErrorKeySpecifier)[];
export type InputFieldErrorFieldPolicy = {
	field?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('accountUpdate' | 'productCreate' | 'productUpdate' | 'testMutation' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	accountUpdate?: FieldPolicy<any> | FieldReadFunction<any>,
	productCreate?: FieldPolicy<any> | FieldReadFunction<any>,
	productUpdate?: FieldPolicy<any> | FieldReadFunction<any>,
	testMutation?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NodeKeySpecifier = ('id' | NodeKeySpecifier)[];
export type NodeFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PriceKeySpecifier = ('amount' | 'amountCents' | 'currencyCode' | 'id' | 'name' | 'scope' | 'units' | PriceKeySpecifier)[];
export type PriceFieldPolicy = {
	amount?: FieldPolicy<any> | FieldReadFunction<any>,
	amountCents?: FieldPolicy<any> | FieldReadFunction<any>,
	currencyCode?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	scope?: FieldPolicy<any> | FieldReadFunction<any>,
	units?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProductKeySpecifier = ('account' | 'canDelete' | 'canEdit' | 'currencyCode' | 'description' | 'editUrl' | 'id' | 'name' | 'prices' | 'url' | ProductKeySpecifier)[];
export type ProductFieldPolicy = {
	account?: FieldPolicy<any> | FieldReadFunction<any>,
	canDelete?: FieldPolicy<any> | FieldReadFunction<any>,
	canEdit?: FieldPolicy<any> | FieldReadFunction<any>,
	currencyCode?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	editUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	prices?: FieldPolicy<any> | FieldReadFunction<any>,
	url?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProductCreatePayloadKeySpecifier = ('clientMutationId' | 'errors' | 'product' | ProductCreatePayloadKeySpecifier)[];
export type ProductCreatePayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	product?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProductUpdatePayloadKeySpecifier = ('clientMutationId' | 'errors' | 'product' | ProductUpdatePayloadKeySpecifier)[];
export type ProductUpdatePayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	product?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('currencies' | 'currency' | 'product' | 'testEcho' | 'viewer' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	currencies?: FieldPolicy<any> | FieldReadFunction<any>,
	currency?: FieldPolicy<any> | FieldReadFunction<any>,
	product?: FieldPolicy<any> | FieldReadFunction<any>,
	testEcho?: FieldPolicy<any> | FieldReadFunction<any>,
	viewer?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SubscriptionKeySpecifier = ('testSubscription' | SubscriptionKeySpecifier)[];
export type SubscriptionFieldPolicy = {
	testSubscription?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TestModelKeySpecifier = ('birthday' | 'id' | 'name' | TestModelKeySpecifier)[];
export type TestModelFieldPolicy = {
	birthday?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TestMutationPayloadKeySpecifier = ('clientMutationId' | 'errors' | 'model' | TestMutationPayloadKeySpecifier)[];
export type TestMutationPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	model?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UnitsKeySpecifier = ('plural' | 'singular' | UnitsKeySpecifier)[];
export type UnitsFieldPolicy = {
	plural?: FieldPolicy<any> | FieldReadFunction<any>,
	singular?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserKeySpecifier = ('email' | 'id' | 'name' | 'primaryAccount' | 'unconfirmedEmail' | UserKeySpecifier)[];
export type UserFieldPolicy = {
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	primaryAccount?: FieldPolicy<any> | FieldReadFunction<any>,
	unconfirmedEmail?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	Account?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AccountKeySpecifier | (() => undefined | AccountKeySpecifier),
		fields?: AccountFieldPolicy,
	},
	AccountUpdatePayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AccountUpdatePayloadKeySpecifier | (() => undefined | AccountUpdatePayloadKeySpecifier),
		fields?: AccountUpdatePayloadFieldPolicy,
	},
	Currency?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CurrencyKeySpecifier | (() => undefined | CurrencyKeySpecifier),
		fields?: CurrencyFieldPolicy,
	},
	InputFieldError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InputFieldErrorKeySpecifier | (() => undefined | InputFieldErrorKeySpecifier),
		fields?: InputFieldErrorFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	Node?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NodeKeySpecifier | (() => undefined | NodeKeySpecifier),
		fields?: NodeFieldPolicy,
	},
	Price?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PriceKeySpecifier | (() => undefined | PriceKeySpecifier),
		fields?: PriceFieldPolicy,
	},
	Product?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProductKeySpecifier | (() => undefined | ProductKeySpecifier),
		fields?: ProductFieldPolicy,
	},
	ProductCreatePayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProductCreatePayloadKeySpecifier | (() => undefined | ProductCreatePayloadKeySpecifier),
		fields?: ProductCreatePayloadFieldPolicy,
	},
	ProductUpdatePayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProductUpdatePayloadKeySpecifier | (() => undefined | ProductUpdatePayloadKeySpecifier),
		fields?: ProductUpdatePayloadFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	Subscription?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SubscriptionKeySpecifier | (() => undefined | SubscriptionKeySpecifier),
		fields?: SubscriptionFieldPolicy,
	},
	TestModel?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TestModelKeySpecifier | (() => undefined | TestModelKeySpecifier),
		fields?: TestModelFieldPolicy,
	},
	TestMutationPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TestMutationPayloadKeySpecifier | (() => undefined | TestMutationPayloadKeySpecifier),
		fields?: TestMutationPayloadFieldPolicy,
	},
	Units?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UnitsKeySpecifier | (() => undefined | UnitsKeySpecifier),
		fields?: UnitsFieldPolicy,
	},
	User?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier),
		fields?: UserFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;