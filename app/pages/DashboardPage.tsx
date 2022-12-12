import type { PageComponent } from "~/helpers/inertia";
import type { DeepRequired } from "~/helpers/utils";

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
}) => {
  return (
    <Box>
      <Title size="h2">Your Products</Title>
      <List listStyleType="none">
        {products.map(({ id, name, url }) => (
          <List.Item key={id}>
            <Anchor component={Link} href={url} color="indigo">
              {name}
            </Anchor>
          </List.Item>
        ))}
      </List>
    </Box>
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
