import type { FC } from "react";
import type { PageComponent } from "~/helpers/inertia";
import { Code, Text } from "@mantine/core";
import type { DeepRequired } from "~/helpers/utils";

import ExternalLinkIcon from "~icons/heroicons/arrow-top-right-on-square-20-solid";

import type { OrderPageQuery } from "~/queries";

import { useFormattedCurrencyAmount } from "~/helpers/currency";
import type { CurrencyFormattingInfo } from "~/helpers/currency";
import OrderQuestionResponseField from "~/components/OrderQuestionResponseField";

type OrderPageProps = {
  readonly data: DeepRequired<OrderPageQuery, ["order"]>;
};

const OrderPage: PageComponent<OrderPageProps> = ({
  data: {
    order: {
      createdAt: createdAtISO,
      code,
      stripePaymentIntentUrl,
      subtotal,
      customer,
      product,
      items,
    },
  },
}) => {
  const { currency, items: productItems } = product;
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
  const productItemsById = useMemo(
    () => keyBy(productItems, "id"),
    [productItems],
  );

  // == Markup
  return (
    <Stack>
      <Alert variant="outline" color="indigo">
        <Stack spacing={8}>
          <Text size="sm">
            Displaying order information for order{" "}
            <Code
              color="indigo"
              sx={({ colors }) => ({ color: colors.indigo[9] })}
            >
              {code}
            </Code>
            .
          </Text>
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
      </Alert>
      <Stack spacing={4}>
        <Title order={2} size="h3">
          Customer
        </Title>
        <Card withBorder p="xs">
          <Text weight={600} mb={-8}>
            {customerName}
          </Text>
          <Anchor href={customerEmailUrl} size="xs" color="dimmed">
            {customer.email}
          </Anchor>
        </Card>
      </Stack>
      <Stack spacing={4}>
        <Title order={2} size="h3">
          Product
        </Title>
        <Card withBorder p="xs">
          <Anchor component={Link} href={product.url} weight={600}>
            {product.name}
          </Anchor>
          <Group position="apart">
            <Text size="sm" color="dimmed">
              Ordered On
            </Text>
            <Text size="sm">{createdAtLabel}</Text>
          </Group>
          <CurrencyAmountLine {...{ currency }}>{subtotal}</CurrencyAmountLine>
          <Divider my={8} />
          <Stack align="start" spacing={4} mt="xs">
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
        </Card>
      </Stack>
      <Stack spacing={4}>
        <Title order={2} size="h3">
          Items
        </Title>
        <Stack>
          {Object.entries(itemsByProductItemId).flatMap(
            ([productItemId, items]) => {
              const { name, price } = productItemsById[productItemId]!;
              return items.map(({ id, questionResponses }, index) => (
                <Card key={id} withBorder p="xs">
                  <Text weight={600}>
                    {name} <>{items.length > 1 && <>{index + 1}</>}</>
                  </Text>
                  <CurrencyAmountLine {...{ currency }}>
                    {price}
                  </CurrencyAmountLine>
                  {!isEmpty(questionResponses) && (
                    <>
                      <Divider my={8} />
                      <Stack spacing={4}>
                        {questionResponses.map(({ id, question, answer }) => (
                          <OrderQuestionResponseField
                            key={id}
                            value={answer}
                            {...{ question }}
                            readOnly
                          />
                        ))}
                      </Stack>
                    </>
                  )}
                </Card>
              ));
            },
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

OrderPage.layout = buildLayout<OrderPageProps>(
  (page, { data: { viewer, order } }) => (
    <AppLayout
      title={`Order ${order.code}`}
      description={null}
      containerSize="xs"
      withContainer
      withGutter
      {...{ viewer }}
    >
      {page}
    </AppLayout>
  ),
);

export default OrderPage;

type CurrencyAmountLineProps = {
  readonly currency: CurrencyFormattingInfo;
  readonly children: string | number;
};

const CurrencyAmountLine: FC<CurrencyAmountLineProps> = ({
  currency,
  children,
}) => {
  const formattedAmount = useFormattedCurrencyAmount(children, currency);
  return (
    <Group position="apart">
      <Text size="sm" color="dimmed">
        Price
      </Text>
      <Text size="sm">{formattedAmount}</Text>
    </Group>
  );
};
