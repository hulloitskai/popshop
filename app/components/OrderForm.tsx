import type { FC } from "react";
import { sum } from "lodash-es";
import { useFormattedCurrencyAmount } from "~/helpers/currency";

import { Text } from "@mantine/core";

import OrderFormQuantityField from "./OrderFormQuantityField";
import OrderFormCustomerFields from "./OrderFormCustomerFields";
import OrderQuestionResponseField from "./OrderQuestionResponseField";

import { OrderCreateMutationDocument } from "~/queries";
import type { OrderFormProductFragment } from "~/queries";

export type OrderFormProps = {
  readonly product: OrderFormProductFragment;
};

export type OrderValues = {
  readonly itemsByProductItemId: Record<string, OrderItemValues[]>;
  readonly customer: OrderCustomerValues;
};

export type OrderItemValues = {
  readonly productItemId: string;
  readonly questionResponses: OrderItemQuestionResponseValues[];
};

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
  "itemsByProductItemId"
> & {
  readonly items: OrderItemValues[];
};

const OrderForm: FC<OrderFormProps> = ({ product }) => {
  const { id: productId, currency } = product;
  const productItemsById = useMemo(() => keyBy(product.items, "id"), [product]);

  // == Form
  const initialValues = useMemo<OrderValues>(
    () => ({
      itemsByProductItemId: Object.fromEntries(
        product.items.map(({ id }) => [id, []]),
      ),
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
    transformValues: ({ itemsByProductItemId, ...values }) => ({
      ...values,
      items: Object.values(itemsByProductItemId).flat(),
    }),
  });
  const { values, onSubmit, setErrors, getInputProps } = form;
  const { itemsByProductItemId } = values;

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
        showAlert({ message: "Failed to create order" });
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
        {Object.entries(itemsByProductItemId).map(([productItemId, items]) => {
          const productItem = productItemsById[productItemId]!;
          return (
            <OrderFormQuantityField
              key={productItemId}
              quantity={items.length}
              {...{
                form,
                product,
                productItem,
                values,
              }}
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
            {Object.values(itemsByProductItemId)
              .flat()
              .map(({ productItemId }, itemIndex) => {
                const { name, questions } = productItemsById[productItemId]!;
                return !isEmpty(questions) ? (
                  <Card
                    key={[productItemId, itemIndex].join(":")}
                    withBorder
                    bg="gray.0"
                    p="sm"
                  >
                    <Text size="lg" weight={700}>
                      {name} {itemIndex + 1}
                    </Text>
                    <Stack spacing={8}>
                      {questions.map((question, index) => (
                        <OrderQuestionResponseField
                          key={index}
                          required
                          {...{ question }}
                          {...getInputProps(
                            `itemsByProductItemId.${productItemId}.${itemIndex}.questionResponses.${index}.answer`,
                          )}
                        />
                      ))}
                    </Stack>
                  </Card>
                ) : null;
              })}
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
