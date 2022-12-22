import type { FC } from "react";

import { Text } from "@mantine/core";
import type { CardProps } from "@mantine/core";

import type { ProductCardProductFragment } from "~/queries";

export type ProductCardProps = Omit<CardProps, "children"> & {
  readonly product: ProductCardProductFragment;
};

const ProductCard: FC<ProductCardProps> = ({
  product: { name, description },
}) => (
  <Card withBorder p="xs" sx={({ fontSizes }) => ({ fontSize: fontSizes.sm })}>
    <Text weight={600}>{name}</Text>
    {!!description && <Text>{description}</Text>}
  </Card>
);

export default ProductCard;
