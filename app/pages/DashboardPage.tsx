import type { PageComponent } from "~/helpers/inertia";
import type { DeepRequired } from "~/helpers/utils";

import DashboardStripeAlert from "~/components/DashboardStripeAlert";
import ProductCard from "~/components/ProductCard";
import OrderCard from "~/components/OrderCard";

import AddIcon from "~icons/heroicons/plus-circle-20-solid";

import type { DashboardPageQuery } from "~/queries";

export type DashboardPageProps = {
  readonly data: DeepRequired<DashboardPageQuery, ["viewer"]>;
};

const DashboardPage: PageComponent<DashboardPageProps> = ({
  data: {
    viewer: { primaryAccount },
  },
}) => {
  const { products, orders } = primaryAccount;
  return (
    <Stack>
      <DashboardStripeAlert account={primaryAccount} />
      <Box>
        <Title order={2}>Products</Title>
        <Stack spacing={6}>
          {products.map(product => {
            const { id, url } = product;
            return (
              <Anchor key={id} component={Link} href={url} color="indigo">
                <ProductCard {...{ product }} />
              </Anchor>
            );
          })}
          <Button component={Link} href="/products/new" leftIcon={<AddIcon />}>
            New Product
          </Button>
        </Stack>
      </Box>
      <Box>
        <Title order={2}>Orders</Title>
        <Stack spacing={8} mt={2}>
          {orders.edges.map(({ node: order }) => {
            const { id } = order;
            return <OrderCard key={id} {...{ order }} />;
          })}
        </Stack>
      </Box>
    </Stack>
  );
};

DashboardPage.layout = layoutWithData<DashboardPageProps>(
  (page, { viewer }) => (
    <AppLayout withContainer withGutter containerSize="xs" {...{ viewer }}>
      {page}
    </AppLayout>
  ),
);

export default DashboardPage;
