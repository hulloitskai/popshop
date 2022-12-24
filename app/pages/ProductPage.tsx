import type { PageComponent } from "~/helpers/inertia";
import type { DeepRequired } from "~/helpers/utils";
import { Spoiler, Text } from "@mantine/core";

import OrderForm from "~/components/OrderForm";

import EditIcon from "~icons/heroicons/pencil-20-solid";

import type { ProductPageQuery } from "~/queries";

type ProductPageProps = {
  readonly data: DeepRequired<ProductPageQuery, ["product"]>;
};

const ProductPage: PageComponent<ProductPageProps> = ({
  data: { product },
}) => {
  const { canEdit, editUrl, name, description } = product;
  return (
    <Stack>
      <Stack spacing={8}>
        <Title>{name}</Title>
        {canEdit && (
          <ActionBar>
            <Button component={Link} href={editUrl} leftIcon={<EditIcon />}>
              Edit
            </Button>
          </ActionBar>
        )}
      </Stack>
      {!!description && (
        <Spoiler
          maxHeight={175}
          showLabel="Show more"
          hideLabel="Show less"
          styles={({ colors, fn }) => ({
            control: {
              color: colors.indigo[fn.primaryShade()],
            },
          })}
        >
          <Text sx={{ whiteSpace: "pre-line" }}>{description}</Text>
        </Spoiler>
      )}
      <MediaQuery
        largerThan="xs"
        styles={({ spacing }) => ({
          paddingTop: spacing.lg,
          paddingBottom: spacing.lg,
        })}
      >
        <Center>
          <Card withBorder w="100%" maw={540}>
            <Stack spacing={4}>
              <Title order={3}>Place Order</Title>
              <OrderForm {...{ product }} />
            </Stack>
          </Card>
        </Center>
      </MediaQuery>
    </Stack>
  );
};

ProductPage.layout = buildLayout<ProductPageProps>(
  (page, { data: { viewer, product } }) => (
    <AppLayout
      title={product.name}
      description={product.description}
      withContainer
      withGutter
      {...{ viewer }}
    >
      {page}
    </AppLayout>
  ),
);

export default ProductPage;
