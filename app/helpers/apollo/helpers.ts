import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type AccountUpdatePayloadKeySpecifier = ('clientMutationId' | 'errors' | 'user' | AccountUpdatePayloadKeySpecifier)[];
export type AccountUpdatePayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type IdentifiableKeySpecifier = ('id' | 'shortId' | IdentifiableKeySpecifier)[];
export type IdentifiableFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	shortId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('accountUpdate' | 'testMutation' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	accountUpdate?: FieldPolicy<any> | FieldReadFunction<any>,
	testMutation?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NodeKeySpecifier = ('id' | NodeKeySpecifier)[];
export type NodeFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('authenticatedViewer' | 'testEcho' | 'viewer' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	authenticatedViewer?: FieldPolicy<any> | FieldReadFunction<any>,
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
export type UserKeySpecifier = ('email' | 'id' | 'isOwner' | 'name' | 'shortId' | 'unconfirmedEmail' | UserKeySpecifier)[];
export type UserFieldPolicy = {
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	isOwner?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	shortId?: FieldPolicy<any> | FieldReadFunction<any>,
	unconfirmedEmail?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ValidationErrorKeySpecifier = ('field' | 'message' | ValidationErrorKeySpecifier)[];
export type ValidationErrorFieldPolicy = {
	field?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	AccountUpdatePayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AccountUpdatePayloadKeySpecifier | (() => undefined | AccountUpdatePayloadKeySpecifier),
		fields?: AccountUpdatePayloadFieldPolicy,
	},
	Identifiable?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | IdentifiableKeySpecifier | (() => undefined | IdentifiableKeySpecifier),
		fields?: IdentifiableFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	Node?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NodeKeySpecifier | (() => undefined | NodeKeySpecifier),
		fields?: NodeFieldPolicy,
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
	User?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier),
		fields?: UserFieldPolicy,
	},
	ValidationError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ValidationErrorKeySpecifier | (() => undefined | ValidationErrorKeySpecifier),
		fields?: ValidationErrorFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;