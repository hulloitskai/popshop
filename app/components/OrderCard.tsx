import type { FC } from "react";

import { Code, CopyButton, Text } from "@mantine/core";
import type { CardProps } from "@mantine/core";

import ExternalLinkIcon from "~icons/heroicons/arrow-top-right-on-square-20-solid";

import type { OrderCardOrderFragment } from "~/queries";

export type OrderCardProps = Omit<CardProps, "children"> & {
  readonly order: OrderCardOrderFragment;
};

const OrderCard: FC<OrderCardProps> = ({
  order: {
    createdAt: createdAtISO,
    code,
    stripePaymentIntentUrl,
    customer,
    product,
    items,
  },
}) => {
  const createdAtLabel = useMemo(() => {
    const createdAt = DateTime.fromISO(createdAtISO);
    return createdAt.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY);
  }, [createdAtISO]);
  const customerName = useMemo(() => {
    const { firstName, lastName } = customer;
    return `${firstName} ${lastName}`;
  }, [customer]);
  const customerEmailUrl = useMemo(() => {
    const { email } = customer;
    return `mailto:${encodeURIComponent(customerName)}<${email}>`;
  }, [customer, customerName]);
  return (
    <Card withBorder p="xs">
      <Card.Section mb={2}>
        <Group align="start" position="apart" spacing={8}>
          <Box mx={8} my={4}>
            <Text weight={600} mb={-8}>
              {customerName}
            </Text>
            <Anchor href={customerEmailUrl} size="xs" color="dimmed">
              {customer.email}
            </Anchor>
          </Box>
          <Badge size="xs" variant="outline" color="gray.6" m="xs">
            Customer
          </Badge>
        </Group>
        <Divider />
      </Card.Section>
      <Stack spacing={8}>
        <Box>
          <Group align="start" position="apart" spacing={8}>
            <Box>
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
            {items.map(({ id, productItem: { name }, quantity }) => (
              <Group key={id} spacing={4}>
                <Badge size="sm" variant="outline" radius="sm" color="dark.3">
                  {quantity} × {name}
                </Badge>
              </Group>
            ))}
          </Stack>
        </Box>
        {!!stripePaymentIntentUrl && (
          <Button
            component="a"
            href={stripePaymentIntentUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            variant="outline"
            leftIcon={<ExternalLinkIcon />}
            h="unset"
            py={6}
          >
            Open in Stripe
          </Button>
        )}
      </Stack>
      <Card.Section mt="xs">
        <Divider />
        <Group
          spacing={8}
          position="apart"
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
      </Card.Section>
    </Card>
  );
};

export default OrderCard;
