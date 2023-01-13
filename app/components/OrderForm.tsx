import type { FC } from "react";
import hash from "object-hash";
import { sum } from "lodash-es";
import { useFormattedCurrencyAmount } from "~/helpers/currency";

import { Text } from "@mantine/core";

import OrderFormQuantityField from "./OrderFormQuantityField";
import OrderFormCustomerFields from "./OrderFormCustomerFields";
import OrderQuestionResponseField from "./OrderQuestionResponseField";

import { OrderCreateMutationDocument, OrderQuestionType } from "~/queries";
import type { OrderFormProductFragment } from "~/queries";

export type OrderFormProps = {
  readonly product: OrderFormProductFragment;
};

export type OrderValues = {
  readonly quantities: Record<string, number>;
  readonly items: OrderItemValues[];
  readonly customer: OrderCustomerValues;
};

export type OrderItemValues = {
  readonly productItemId: string;
  readonly count?: number;
  readonly questionResponses: OrderItemQuestionResponseValues[];
};

export type OrderItemValuesForSubmission = Omit<OrderItemValues, "count">;

export type OrderItemQuestionResponseValues = {
  readonly questionId: string;
  readonly answer: any;
};

export type OrderCustomerValues = {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
};

export type OrderTransformValues = (
  values: OrderValues,
) => OrderValuesForSubmission;

export type OrderValuesForSubmission = Omit<
  OrderValues,
  "quantities" | "items"
> & {
  readonly items: OrderItemValuesForSubmission[];
};

const OrderForm: FC<OrderFormProps> = ({ product }) => {
  const { id: productId, currency } = product;
  const productItemsById = useMemo(() => keyBy(product.items, "id"), [product]);

  // == Form
  const initialValues = useMemo<OrderValues>(
    () => ({
      quantities: Object.fromEntries(product.items.map(({ id }) => [id, 0])),
      items: [],
      customer: {
        firstName: "",
        lastName: "",
        email: "",
      },
    }),
    [product],
  );
  const form = useForm<OrderValues, OrderTransformValues>({
    initialValues,
    transformValues: ({ items, ...values }) => ({
      ...omit(values, "quantities"),
      items: items.map(({ questionResponses, ...values }) => ({
        ...omit(values, "count"),
        questionResponses: questionResponses.filter(({ answer }) => !!answer),
      })),
    }),
  });
  const { values, onSubmit, setErrors, setFieldValue, getInputProps } = form;
  const { quantities, items } = values;
  const quantitiesHash = useMemo(() => hash(quantities), [quantities]);
  const itemsByProductItemId = useMemo(
    () => groupBy(items, "productItemId"),
    [items],
  );
  useEffect(() => {
    const items = Object.entries(quantities).flatMap(
      ([productItemId, quantity]) => {
        if (
          typeof quantity === "number" &&
          !Number.isNaN(quantity) &&
          quantity >= 0
        ) {
          const { questions } = productItemsById[productItemId]!;
          return new Array(quantity).fill(null).map((_, index) => ({
            productItemId,
            count: quantity > 1 ? index + 1 : undefined,
            questionResponses: questions.map(({ id: questionId, type }) => ({
              questionId,
              answer: resolve(() => {
                switch (type) {
                  case OrderQuestionType.Checkbox:
                    return false;
                  case OrderQuestionType.MultipleChoice:
                    return [];
                  default:
                    return "";
                }
              }),
            })),
          }));
        }
        return [];
      },
    );
    setFieldValue("items", items);
  }, [quantitiesHash]);

  // == Mutation
  const onError = useApolloErrorCallback("Failed to submit order");
  const [runMutation, { loading }] = useMutation(OrderCreateMutationDocument, {
    onCompleted: ({ payload: { order, errors } }) => {
      if (order) {
        const { stripeCheckoutSessionUrl } = order;
        window.location.href = stripeCheckoutSessionUrl;
      } else {
        invariant(errors, "Missing errors");
        setErrors(formErrors(errors));
        showFormErrors("Could not create order");
      }
    },
    onError,
  });

  // == Subtotal
  const subtotal = useMemo(() => {
    const prices = Object.entries(itemsByProductItemId).map(
      ([productItemId, items]) => {
        const { price } = productItemsById[productItemId]!;
        return items.length * parseFloat(price);
      },
    );
    return sum(prices);
  }, [itemsByProductItemId]);
  const formattedSubtotal = useFormattedCurrencyAmount(subtotal, currency);

  // == Total
  const total = useMemo(() => {
    const taxes = Object.entries(itemsByProductItemId).map(
      ([productItemId, items]) => {
        const { taxRatePercentage, price } = productItemsById[productItemId]!;
        return taxRatePercentage
          ? (items.length * parseFloat(price) * taxRatePercentage) / 100
          : 0;
      },
    );
    return subtotal + sum(taxes);
  }, [subtotal, itemsByProductItemId]);
  const formattedTotal = useFormattedCurrencyAmount(total, currency);

  // == Markup
  return (
    <form
      onSubmit={onSubmit(values => {
        runMutation({
          variables: {
            input: {
              productId,
              ...values,
            },
          },
        });
      })}
    >
      <Stack spacing={8}>
        {Object.keys(quantities).map(productItemId => {
          const productItem = productItemsById[productItemId]!;
          return (
            <OrderFormQuantityField
              key={productItemId}
              {...{
                product,
                productItem,
                values,
              }}
              {...getInputProps(`quantities.${productItemId}`)}
            />
          );
        })}
        {subtotal > 0 && (
          <>
            <Divider />
            <Box>
              <Group position="apart">
                <Box>
                  <Text weight={600}>Subtotal</Text>
                  <Text size="xs" color="dimmed" mt={-6}>
                    (before taxes)
                  </Text>
                </Box>
                <Badge size="lg" variant="outline">
                  {formattedSubtotal}
                </Badge>
              </Group>
              <Group position="apart">
                <Box>
                  <Text weight={600}>Total</Text>
                  <Text size="xs" color="dimmed" mt={-6}>
                    (after taxes)
                  </Text>
                </Box>
                <Badge size="lg" variant="filled">
                  {formattedTotal}
                </Badge>
              </Group>
            </Box>
            <Space />
            {items
              .map(({ productItemId, count }, index) => {
                const { name, questions } = productItemsById[productItemId]!;
                return !isEmpty(questions) ? (
                  <Card
                    key={[productItemId, count].join(":")}
                    withBorder
                    bg="gray.0"
                    p="sm"
                  >
                    <Text size="lg" weight={700}>
                      {name}
                      {!!count && <> {count}</>}
                    </Text>
                    <Stack spacing={8}>
                      {questions.map((question, questionIndex) => (
                        <OrderQuestionResponseField
                          key={question.id}
                          {...{ question }}
                          {...getInputProps(
                            `items.${index}.questionResponses.${questionIndex}.answer`,
                          )}
                        />
                      ))}
                    </Stack>
                  </Card>
                ) : null;
              })
              .flat()}
            <Card withBorder bg="gray.0" p="sm">
              <Text size="lg" weight={700}>
                Your Contact Information
              </Text>
              <OrderFormCustomerFields {...{ form }} />
            </Card>
            <Button type="submit" {...{ loading }}>
              Continue
            </Button>
          </>
        )}
      </Stack>
    </form>
  );
};

export default OrderForm;
