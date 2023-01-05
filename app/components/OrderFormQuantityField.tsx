import type { FC } from "react";
import { fill } from "lodash-es";
import { useFormattedCurrencyAmount } from "~/helpers/currency";

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
  productItem: { id: productItemId, name, units, orderScope, price, questions },
  quantity,
  ...otherProps
}) => {
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

  // == Markup
  return (
    <Box {...otherProps}>
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
              <Text color="gray.7" weight={500}>
                {formattedUnitAmount}
              </Text>
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
        {!!totalAmount && (
          <Badge variant="outline" color="indigo" size="lg">
            {formattedTotalAmount}
          </Badge>
        )}
      </Group>
    </Box>
  );
};

export default OrderFormQuantityField;
