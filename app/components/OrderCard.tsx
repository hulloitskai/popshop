import type { FC } from "react";

import { Text } from "@mantine/core";
import type { CardProps } from "@mantine/core";

import type { OrderCardProductFragment } from "~/queries";

export type OrderCardProps = Omit<CardProps, "children"> & {
  readonly product: OrderCardProductFragment;
};

const OrderCard: FC<OrderCardProps> = ({
  product: { prices },
  ...otherProps
}) => {
  return (
    <Card withBorder p="xs" maw={540} {...otherProps}>
      <Stack spacing="xs">
        {prices.map(({ id }) => (
          <Group key={id} spacing="xs">
            <Text>Hi</Text>
          </Group>
        ))}
      </Stack>
    </Card>
  );
};

export default OrderCard;
