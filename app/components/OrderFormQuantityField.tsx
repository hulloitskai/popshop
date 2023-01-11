import type { FC } from "react";
import { fill } from "lodash-es";
import {
  formatCurrencyAmount,
  useFormattedCurrencyAmount,
} from "~/helpers/currency";

import { Text } from "@mantine/core";
import type { BoxProps } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";

import type {
  OrderValues,
  OrderTransformValues,
  OrderItemValues,
} from "./OrderForm";

import { OrderQuestionType, OrderScope } from "~/queries";
import type {
  OrderFormProductItemFragment,
  OrderFormProductFragment,
} from "~/queries";

export type OrderFormQuantityFieldProps = BoxProps & {
  readonly form: UseFormReturnType<OrderValues, OrderTransformValues>;
  readonly product: OrderFormProductFragment;
  readonly productItem: OrderFormProductItemFragment;
  readonly quantity: number;
};

const OrderFormQuantityField: FC<OrderFormQuantityFieldProps> = ({
  form: { setFieldValue },
  product: { currency, items },
  productItem: {
    id: productItemId,
    name,
    units,
    orderScope,
    price,
    taxRatePercentage,
    questions,
  },
  quantity,
  ...otherProps
}) => {
  const unitsLabel = useMemo(
    () => (quantity == 1 ? units?.singular : units?.plural),
    [quantity],
  );

  const unitAmount = useMemo(() => parseFloat(price), [price]);
  const taxAmount = useMemo(() => {
    if (taxRatePercentage) {
      return (quantity * unitAmount * taxRatePercentage) / 100;
    }
  }, [quantity, unitAmount, taxRatePercentage]);
  const formattedUnitAmount = useFormattedCurrencyAmount(unitAmount, currency);

  // == Subtotal
  const subtotalAmount = useMemo(
    () => unitAmount * quantity,
    [unitAmount, quantity],
  );
  const formattedSubtotalAmount = useFormattedCurrencyAmount(
    subtotalAmount,
    currency,
  );

  // == Total
  const totalAmount = useMemo(() => {
    if (taxAmount) {
      return subtotalAmount + taxAmount * quantity;
    }
  }, [subtotalAmount, taxAmount, quantity]);
  const formattedTotalAmount = useMemo(() => {
    if (totalAmount) {
      return formatCurrencyAmount(totalAmount, currency);
    }
  }, [totalAmount, currency]);

  // == Markup
  return (
    <Box mb={taxRatePercentage ? 10 : 0} {...otherProps}>
      {items.length > 1 && <Text weight={600}>{name}</Text>}
      <Group spacing={6}>
        <NumberInput
          min={0}
          max={orderScope === OrderScope.PerOrder ? 1 : undefined}
          startValue={1}
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
              <Stack spacing={0} pos="relative" top={taxRatePercentage ? 8 : 0}>
                <Text color="gray.7" weight={500}>
                  {formattedUnitAmount}
                </Text>
                {!!taxRatePercentage && (
                  <Text size="xs" color="gray.6" mt={-5}>
                    (with {taxRatePercentage}% tax)
                  </Text>
                )}
              </Stack>
            </Group>
          )}
          onChange={quantity => {
            if (
              typeof quantity === "number" &&
              !Number.isNaN(quantity) &&
              quantity >= 0
            ) {
              const value = fill<OrderItemValues>(new Array(quantity), {
                productItemId,
                questionResponses: questions.map(
                  ({ id: questionId, type }) => ({
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
                  }),
                ),
              });
              setFieldValue(`itemsByProductItemId.${productItemId}`, value);
            }
          }}
        />
        {!!subtotalAmount && (
          <Stack
            align="end"
            spacing={2}
            pos="relative"
            top={totalAmount ? 11 : 0}
          >
            <Badge variant="outline" color="indigo" size="lg">
              {formattedSubtotalAmount}
            </Badge>
            {!!totalAmount && (
              <Text size="xs" color="gray.6">
                ({formattedTotalAmount} after tax)
              </Text>
            )}
          </Stack>
        )}
      </Group>
    </Box>
  );
};

export default OrderFormQuantityField;
