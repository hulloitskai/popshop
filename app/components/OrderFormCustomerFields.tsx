import type { FC } from "react";

import { Text } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";

import type { OrderTransformValues, OrderValues } from "./OrderForm";

export type OrderFormCustomerFieldsProps = {
  readonly form: UseFormReturnType<OrderValues, OrderTransformValues>;
};

const OrderFormCustomerFields: FC<OrderFormCustomerFieldsProps> = ({
  form: { getInputProps },
}) => (
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
);

export default OrderFormCustomerFields;
