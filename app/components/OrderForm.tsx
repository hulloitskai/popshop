import type { FC } from "react";
import { sum } from "lodash-es";
import { useFormattedCurrencyAmount } from "~/helpers/currency";
import { orderScopeOrdering } from "~/helpers/types/OrderScope";

import { BoxProps, Text } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";

import { OrderCreateMutationDocument, OrderScope } from "~/queries";
import type {
  OrderFormProductItemFragment,
  OrderFormProductFragment,
} from "~/queries";

export type OrderFormProps = {
  readonly product: OrderFormProductFragment;
};

export type OrderValues = {
  readonly items: OrderItemValues[];
  readonly customer: OrderCustomerValues;
};

export type OrderItemValues = {
  readonly productItemId: string;
  readonly quantity: number;
};

export type OrderCustomerValues = {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
};

const OrderForm: FC<OrderFormProps> = ({ product }) => {
  const { id: productId } = product;
  const productItemsById = useMemo(() => keyBy(product.items, "id"), [product]);

  // == Form
  const initialValues = useMemo<OrderValues>(() => {
    const items: OrderItemValues[] = product.items.map(({ id }) => ({
      productItemId: id,
      quantity: 0,
    }));
    return {
      items: sortBy(items, ({ productItemId: productItemId }) => {
        const { orderScope } = productItemsById[productItemId]!;
        return orderScopeOrdering(orderScope);
      }),
      customer: {
        firstName: "",
        lastName: "",
        email: "",
      },
    };
  }, [product]);
  const form = useForm<OrderValues>({
    initialValues,
    transformValues: ({ items, ...values }) => ({
      ...values,
      items: items.filter(({ quantity }) => quantity > 0),
    }),
  });
  const { values, onSubmit, setErrors } = form;
  const { items } = values;

  // == Mutation
  const onError = useApolloErrorCallback("Failed to submit order");
  const [runMutation, { loading }] = useMutation(OrderCreateMutationDocument, {
    onCompleted: ({ payload: { order, errors } }) => {
      if (order) {
        const { stripeCheckoutSessionUrl } = order;
        window.location.href = stripeCheckoutSessionUrl;
      } else {
        invariant(errors);
        setErrors(formErrors(errors));
        showAlert({ message: "Failed to create order." });
      }
    },
    onError,
  });

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
        {items.map((values, index) => {
          const { productItemId: ProductItemId } = values;
          const item = productItemsById[ProductItemId]!;
          return (
            <OrderItemField
              key={ProductItemId}
              {...{ form, product, item, values, index }}
            />
          );
        })}
        <OrderCustomerFields
          {...{ form, product, productItemsById, loading }}
        />
      </Stack>
    </form>
  );
};

export default OrderForm;

export type OrderQuantityFieldProps = BoxProps & {
  readonly form: UseFormReturnType<OrderValues>;
  readonly product: OrderFormProductFragment;
  readonly item: OrderFormProductItemFragment;
  readonly index: number;
};

const OrderItemField: FC<OrderQuantityFieldProps> = ({
  form: { values, getInputProps },
  product: { currency, items },
  item: { name, units, orderScope, price },
  index,
  ...otherProps
}) => {
  const { quantity } = values.items[index]!;
  const unitsLabel = useMemo(
    () => (quantity == 1 ? units?.singular : units?.plural),
    [quantity],
  );
  const unitAmount = useMemo(() => parseFloat(price), [price]);
  const totalAmount = useMemo(
    () => unitAmount * quantity,
    [unitAmount, quantity],
  );
  const formattedUnitAmount = useFormattedCurrencyAmount(unitAmount, currency);
  const formattedTotalAmount = useFormattedCurrencyAmount(
    totalAmount,
    currency,
  );
  return (
    <Box {...otherProps}>
      {items.length > 1 && <Text weight={600}>{name}</Text>}
      <Group spacing={6}>
        <NumberInput
          min={0}
          max={orderScope === OrderScope.PerOrder ? 1 : undefined}
          styles={{
            root: {
              flex: 1,
            },
            wrapper: {
              width: 80,
            },
          }}
          inputContainer={children => (
            <Group spacing={6}>
              {children}
              {!!unitsLabel && <Text color="gray.7">{unitsLabel}</Text>}
              <Text color="gray.7">×</Text>
              <Text color="gray.7" weight={500}>
                {formattedUnitAmount}
              </Text>
            </Group>
          )}
          {...getInputProps(`items.${index}.quantity`)}
        />
        {!!totalAmount && (
          <Badge variant="outline" color="indigo" size="lg">
            {formattedTotalAmount}
          </Badge>
        )}
      </Group>
    </Box>
  );
};

type OrderCustomerFieldsProps = {
  readonly form: UseFormReturnType<OrderValues>;
  readonly product: OrderFormProductFragment;
  readonly productItemsById: Record<string, OrderFormProductItemFragment>;
  readonly loading: boolean;
};

const OrderCustomerFields: FC<OrderCustomerFieldsProps> = ({
  form: { values, getInputProps },
  product: { currency },
  productItemsById,
  loading,
}) => {
  const amount = useMemo(() => {
    const { items } = values;
    const amounts = items.map(({ productItemId: itemId, quantity }) => {
      const { price } = productItemsById[itemId]!;
      return quantity * parseFloat(price);
    });
    return sum(amounts);
  }, [values]);
  const formattedAmount = useFormattedCurrencyAmount(amount, currency);
  if (amount > 0) {
    return (
      <>
        <Divider />
        <Group position="apart">
          <Text weight={600}>Total</Text>
          <Badge size="lg" variant="filled">
            {formattedAmount}
          </Badge>
        </Group>
        <Box />
        <Card withBorder bg="gray.0" p="sm">
          <Text size="lg" weight={700}>
            Contact Information
          </Text>
          <Stack spacing={8}>
            <TextInput
              label="First Name"
              required
              {...getInputProps("customer.firstName")}
            />
            <TextInput
              label="Last Name"
              required
              {...getInputProps("customer.lastName")}
            />
            <TextInput
              inputContainer={children => (
                <Box>
                  {children}
                  <Text size="xs" color="gray.6" mt={2}>
                    By proceeding, you agree to receive emails about your order.
                  </Text>
                </Box>
              )}
              label="Email"
              required
              {...getInputProps("customer.email")}
            />
          </Stack>
        </Card>
        <Button type="submit" {...{ loading }}>
          Continue
        </Button>
      </>
    );
  }
  return null;
};
