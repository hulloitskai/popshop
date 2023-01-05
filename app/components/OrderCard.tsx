import type { FC } from "react";

import { Code, CopyButton, Text } from "@mantine/core";
import type { CardProps } from "@mantine/core";

import MoreDetailsIcon from "~icons/heroicons/arrows-pointing-out-20-solid";

import type { OrderCardOrderFragment } from "~/queries";

export type OrderCardProps = Omit<CardProps, "children"> & {
  readonly order: OrderCardOrderFragment;
};

const OrderCard: FC<OrderCardProps> = ({
  order: { createdAt: createdAtISO, code, url, customer, product, items },
}) => {
  const createdAtLabel = useMemo(() => {
    const createdAt = DateTime.fromISO(createdAtISO);
    return createdAt.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY);
  }, [createdAtISO]);

  // == Customer
  const customerName = useMemo(() => {
    const { firstName, lastName } = customer;
    return `${firstName} ${lastName}`;
  }, [customer]);
  const customerEmailUrl = useMemo(() => {
    const { email } = customer;
    return `mailto:${encodeURIComponent(customerName)}<${email}>`;
  }, [customer, customerName]);

  // == Items
  const itemsByProductItemId = useMemo(
    () => groupBy(items, "productItem.id"),
    [items],
  );
  const productItemsById = useMemo(() => keyBy(product.items, "id"), [product]);

  // == Markup
  return (
    <Card withBorder p="xs">
      <Card.Section>
        <Group
          align="start"
          position="apart"
          spacing={8}
          px="xs"
          py={6}
          sx={({ fontSizes }) => ({ fontSize: fontSizes.xs })}
        >
          <CopyButton value={code}>
            {({ copied, copy }) => (
              <Tooltip
                label={copied ? "Copied!" : "Click to copy order code"}
                withArrow
              >
                <Code
                  onClick={copy}
                  sx={({ colors }) => ({
                    cursor: "pointer",
                    color: colors.dark[3],
                    fontSize: 11,
                  })}
                >
                  {code}
                </Code>
              </Tooltip>
            )}
          </CopyButton>
          <Badge size="xs" variant="outline" color="gray.6">
            Order Code
          </Badge>
        </Group>
        <Divider />
      </Card.Section>
      <Card.Section>
        <Group align="start" position="apart" spacing={8} px="xs" py={6}>
          <Box>
            <Text size="sm" weight={600} mb={-8}>
              {customerName}
            </Text>
            <Anchor href={customerEmailUrl} size="xs" color="dimmed">
              {customer.email}
            </Anchor>
          </Box>
          <Badge size="xs" variant="outline" color="gray.6">
            Customer
          </Badge>
        </Group>
        <Divider />
      </Card.Section>
      <Stack spacing={8}>
        <Box>
          <Group align="start" position="apart" spacing={8}>
            <Box pt={4}>
              <Anchor
                component={Link}
                href={product.url}
                size="sm"
                weight={600}
              >
                {product.name}
              </Anchor>
              <Text size="xs" color="dimmed" mt={-4}>
                Ordered on{" "}
                <Text span color="dark.3" weight={500}>
                  {createdAtLabel}{" "}
                </Text>
              </Text>
            </Box>
            <Badge size="xs" variant="outline" color="gray.6" mt={8}>
              Product
            </Badge>
          </Group>
          <Stack align="start" spacing={4} mt={4}>
            {Object.entries(itemsByProductItemId).map(
              ([productItemId, items]) => {
                const { name } = productItemsById[productItemId]!;
                return (
                  <Group key={productItemId} spacing={4}>
                    <Badge
                      size="sm"
                      variant="outline"
                      radius="sm"
                      color="dark.3"
                    >
                      {items.length} × {name}
                    </Badge>
                  </Group>
                );
              },
            )}
          </Stack>
        </Box>
        <Button
          component={Link}
          href={url}
          variant="outline"
          leftIcon={<MoreDetailsIcon />}
          h="unset"
          py={6}
        >
          Show Details
        </Button>
      </Stack>
    </Card>
  );
};

export default OrderCard;
