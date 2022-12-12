import ProductCard from "~/components/ProductCard";
import type { PageComponent } from "~/helpers/inertia";
import type { DeepRequired } from "~/helpers/utils";

import AddIcon from "~icons/heroicons/plus-circle-20-solid";

import type { DashboardPageQuery } from "~/queries";

export type DashboardPageProps = {
  readonly data: DeepRequired<DashboardPageQuery, ["viewer"]>;
};

const DashboardPage: PageComponent<DashboardPageProps> = ({
  data: {
    viewer: {
      primaryAccount: { products },
    },
  },
}) => (
  <Box>
    <Title order={2}>Products</Title>
    <Stack spacing={4}>
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
);

DashboardPage.layout = layoutWithData<DashboardPageProps>(
  (page, { viewer }) => (
    <AppLayout withContainer withGutter containerSize="xs" {...{ viewer }}>
      {page}
    </AppLayout>
  ),
);

export default DashboardPage;
