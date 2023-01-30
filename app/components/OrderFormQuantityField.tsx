import type { FC } from "react";
import {
  formatCurrencyAmount,
  useFormattedCurrencyAmount,
} from "~/helpers/currency";

import { Text } from "@mantine/core";
import type { NumberInputProps } from "@mantine/core";

import { OrderScope } from "~/queries";
import type {
  OrderFormProductItemFragment,
  OrderFormProductFragment,
} from "~/queries";

export type OrderFormQuantityFieldProps = Omit<NumberInputProps, "value"> & {
  readonly product: OrderFormProductFragment;
  readonly productItem: OrderFormProductItemFragment;
  readonly value: number;
};

const OrderFormQuantityField: FC<OrderFormQuantityFieldProps> = ({
  product: { currency, items },
  productItem: { name, units, orderScope, price, taxRatePercentage },
  sx,
  ...otherProps
}) => {
  const { value: quantity } = otherProps;
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
    if (taxRatePercentage) {
      return subtotalAmount + subtotalAmount * (taxRatePercentage / 100);
    }
  }, [subtotalAmount, taxAmount, quantity]);
  const formattedTotalAmount = useMemo(() => {
    if (totalAmount) {
      return formatCurrencyAmount(totalAmount, currency);
    }
  }, [totalAmount, currency]);

  // == Markup
  return (
    <Box mb={taxRatePercentage ? 8 : 0} {...{ sx }}>
      {items.length > 1 && <Text weight={600}>{name}</Text>}
      <Group align="start" position="apart" spacing={6}>
        <NumberInput
          min={0}
          max={orderScope === OrderScope.PerOrder ? 1 : undefined}
          startValue={1}
          styles={{
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
          {...otherProps}
        />
        {!!subtotalAmount && (
          <Stack
            align="end"
            spacing={2}
            pos="relative"
            top={totalAmount ? 9 : 0}
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
