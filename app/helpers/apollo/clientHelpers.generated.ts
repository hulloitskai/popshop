import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type AccountKeySpecifier = ('canDelete' | 'canEdit' | 'id' | 'isStripeConnected' | 'name' | 'orders' | 'owner' | 'products' | 'stripeDashboardUrl' | AccountKeySpecifier)[];
export type AccountFieldPolicy = {
	canDelete?: FieldPolicy<any> | FieldReadFunction<any>,
	canEdit?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	isStripeConnected?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	orders?: FieldPolicy<any> | FieldReadFunction<any>,
	owner?: FieldPolicy<any> | FieldReadFunction<any>,
	products?: FieldPolicy<any> | FieldReadFunction<any>,
	stripeDashboardUrl?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AccountOnboardToStripePayloadKeySpecifier = ('clientMutationId' | 'url' | AccountOnboardToStripePayloadKeySpecifier)[];
export type AccountOnboardToStripePayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	url?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CurrencyKeySpecifier = ('code' | 'exponent' | 'name' | 'symbol' | CurrencyKeySpecifier)[];
export type CurrencyFieldPolicy = {
	code?: FieldPolicy<any> | FieldReadFunction<any>,
	exponent?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	symbol?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CustomerKeySpecifier = ('account' | 'email' | 'firstName' | 'id' | 'lastName' | CustomerKeySpecifier)[];
export type CustomerFieldPolicy = {
	account?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	firstName?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	lastName?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InputFieldErrorKeySpecifier = ('field' | 'message' | InputFieldErrorKeySpecifier)[];
export type InputFieldErrorFieldPolicy = {
	field?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('accountOnboardToStripe' | 'orderCreate' | 'productCreate' | 'productUpdate' | 'testMutation' | 'userChangeEmail' | 'userResendEmailConfirmationInstructions' | 'userUpdate' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	accountOnboardToStripe?: FieldPolicy<any> | FieldReadFunction<any>,
	orderCreate?: FieldPolicy<any> | FieldReadFunction<any>,
	productCreate?: FieldPolicy<any> | FieldReadFunction<any>,
	productUpdate?: FieldPolicy<any> | FieldReadFunction<any>,
	testMutation?: FieldPolicy<any> | FieldReadFunction<any>,
	userChangeEmail?: FieldPolicy<any> | FieldReadFunction<any>,
	userResendEmailConfirmationInstructions?: FieldPolicy<any> | FieldReadFunction<any>,
	userUpdate?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NodeKeySpecifier = ('id' | NodeKeySpecifier)[];
export type NodeFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OrderKeySpecifier = ('account' | 'code' | 'createdAt' | 'customer' | 'id' | 'items' | 'product' | 'stripeCheckoutSessionUrl' | 'stripePaymentIntentUrl' | 'subtotal' | 'subtotalCents' | 'url' | OrderKeySpecifier)[];
export type OrderFieldPolicy = {
	account?: FieldPolicy<any> | FieldReadFunction<any>,
	code?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	customer?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	items?: FieldPolicy<any> | FieldReadFunction<any>,
	product?: FieldPolicy<any> | FieldReadFunction<any>,
	stripeCheckoutSessionUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	stripePaymentIntentUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	subtotal?: FieldPolicy<any> | FieldReadFunction<any>,
	subtotalCents?: FieldPolicy<any> | FieldReadFunction<any>,
	url?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OrderConnectionKeySpecifier = ('edges' | 'nodes' | 'pageInfo' | 'totalCount' | OrderConnectionKeySpecifier)[];
export type OrderConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	nodes?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OrderCreatePayloadKeySpecifier = ('clientMutationId' | 'errors' | 'order' | OrderCreatePayloadKeySpecifier)[];
export type OrderCreatePayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	order?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OrderEdgeKeySpecifier = ('cursor' | 'node' | OrderEdgeKeySpecifier)[];
export type OrderEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OrderItemKeySpecifier = ('currency' | 'id' | 'productItem' | 'questionResponses' | 'subtotal' | 'subtotalCents' | OrderItemKeySpecifier)[];
export type OrderItemFieldPolicy = {
	currency?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	productItem?: FieldPolicy<any> | FieldReadFunction<any>,
	questionResponses?: FieldPolicy<any> | FieldReadFunction<any>,
	subtotal?: FieldPolicy<any> | FieldReadFunction<any>,
	subtotalCents?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OrderQuestionKeySpecifier = ('choices' | 'id' | 'prompt' | 'type' | OrderQuestionKeySpecifier)[];
export type OrderQuestionFieldPolicy = {
	choices?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	prompt?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OrderQuestionResponseKeySpecifier = ('answer' | 'id' | 'question' | OrderQuestionResponseKeySpecifier)[];
export type OrderQuestionResponseFieldPolicy = {
	answer?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	question?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PageInfoKeySpecifier = ('endCursor' | 'hasNextPage' | 'hasPreviousPage' | 'startCursor' | PageInfoKeySpecifier)[];
export type PageInfoFieldPolicy = {
	endCursor?: FieldPolicy<any> | FieldReadFunction<any>,
	hasNextPage?: FieldPolicy<any> | FieldReadFunction<any>,
	hasPreviousPage?: FieldPolicy<any> | FieldReadFunction<any>,
	startCursor?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProductKeySpecifier = ('account' | 'canDelete' | 'canEdit' | 'currency' | 'description' | 'editUrl' | 'id' | 'items' | 'name' | 'url' | ProductKeySpecifier)[];
export type ProductFieldPolicy = {
	account?: FieldPolicy<any> | FieldReadFunction<any>,
	canDelete?: FieldPolicy<any> | FieldReadFunction<any>,
	canEdit?: FieldPolicy<any> | FieldReadFunction<any>,
	currency?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	editUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	items?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	url?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProductCreatePayloadKeySpecifier = ('clientMutationId' | 'errors' | 'product' | ProductCreatePayloadKeySpecifier)[];
export type ProductCreatePayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	product?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProductItemKeySpecifier = ('currency' | 'description' | 'id' | 'name' | 'orderScope' | 'price' | 'priceCents' | 'questions' | 'units' | ProductItemKeySpecifier)[];
export type ProductItemFieldPolicy = {
	currency?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	orderScope?: FieldPolicy<any> | FieldReadFunction<any>,
	price?: FieldPolicy<any> | FieldReadFunction<any>,
	priceCents?: FieldPolicy<any> | FieldReadFunction<any>,
	questions?: FieldPolicy<any> | FieldReadFunction<any>,
	units?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProductUpdatePayloadKeySpecifier = ('clientMutationId' | 'errors' | 'product' | ProductUpdatePayloadKeySpecifier)[];
export type ProductUpdatePayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	product?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('currencies' | 'currency' | 'order' | 'passwordStrength' | 'product' | 'testEcho' | 'viewer' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	currencies?: FieldPolicy<any> | FieldReadFunction<any>,
	currency?: FieldPolicy<any> | FieldReadFunction<any>,
	order?: FieldPolicy<any> | FieldReadFunction<any>,
	passwordStrength?: FieldPolicy<any> | FieldReadFunction<any>,
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
export type UserChangeEmailPayloadKeySpecifier = ('clientMutationId' | 'errors' | 'user' | UserChangeEmailPayloadKeySpecifier)[];
export type UserChangeEmailPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserResendEmailConfirmationInstructionsPayloadKeySpecifier = ('clientMutationId' | 'success' | UserResendEmailConfirmationInstructionsPayloadKeySpecifier)[];
export type UserResendEmailConfirmationInstructionsPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserUpdatePayloadKeySpecifier = ('clientMutationId' | 'errors' | 'user' | UserUpdatePayloadKeySpecifier)[];
export type UserUpdatePayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	Account?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AccountKeySpecifier | (() => undefined | AccountKeySpecifier),
		fields?: AccountFieldPolicy,
	},
	AccountOnboardToStripePayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AccountOnboardToStripePayloadKeySpecifier | (() => undefined | AccountOnboardToStripePayloadKeySpecifier),
		fields?: AccountOnboardToStripePayloadFieldPolicy,
	},
	Currency?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CurrencyKeySpecifier | (() => undefined | CurrencyKeySpecifier),
		fields?: CurrencyFieldPolicy,
	},
	Customer?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CustomerKeySpecifier | (() => undefined | CustomerKeySpecifier),
		fields?: CustomerFieldPolicy,
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
	Order?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OrderKeySpecifier | (() => undefined | OrderKeySpecifier),
		fields?: OrderFieldPolicy,
	},
	OrderConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OrderConnectionKeySpecifier | (() => undefined | OrderConnectionKeySpecifier),
		fields?: OrderConnectionFieldPolicy,
	},
	OrderCreatePayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OrderCreatePayloadKeySpecifier | (() => undefined | OrderCreatePayloadKeySpecifier),
		fields?: OrderCreatePayloadFieldPolicy,
	},
	OrderEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OrderEdgeKeySpecifier | (() => undefined | OrderEdgeKeySpecifier),
		fields?: OrderEdgeFieldPolicy,
	},
	OrderItem?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OrderItemKeySpecifier | (() => undefined | OrderItemKeySpecifier),
		fields?: OrderItemFieldPolicy,
	},
	OrderQuestion?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OrderQuestionKeySpecifier | (() => undefined | OrderQuestionKeySpecifier),
		fields?: OrderQuestionFieldPolicy,
	},
	OrderQuestionResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OrderQuestionResponseKeySpecifier | (() => undefined | OrderQuestionResponseKeySpecifier),
		fields?: OrderQuestionResponseFieldPolicy,
	},
	PageInfo?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PageInfoKeySpecifier | (() => undefined | PageInfoKeySpecifier),
		fields?: PageInfoFieldPolicy,
	},
	Product?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProductKeySpecifier | (() => undefined | ProductKeySpecifier),
		fields?: ProductFieldPolicy,
	},
	ProductCreatePayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProductCreatePayloadKeySpecifier | (() => undefined | ProductCreatePayloadKeySpecifier),
		fields?: ProductCreatePayloadFieldPolicy,
	},
	ProductItem?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProductItemKeySpecifier | (() => undefined | ProductItemKeySpecifier),
		fields?: ProductItemFieldPolicy,
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
	},
	UserChangeEmailPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserChangeEmailPayloadKeySpecifier | (() => undefined | UserChangeEmailPayloadKeySpecifier),
		fields?: UserChangeEmailPayloadFieldPolicy,
	},
	UserResendEmailConfirmationInstructionsPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserResendEmailConfirmationInstructionsPayloadKeySpecifier | (() => undefined | UserResendEmailConfirmationInstructionsPayloadKeySpecifier),
		fields?: UserResendEmailConfirmationInstructionsPayloadFieldPolicy,
	},
	UserUpdatePayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserUpdatePayloadKeySpecifier | (() => undefined | UserUpdatePayloadKeySpecifier),
		fields?: UserUpdatePayloadFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;