import type { PageComponent } from "~/helpers/inertia";
import { Text } from "@mantine/core";

import type { DashboardPageQuery } from "~/queries";

export type DashboardPageProps = {
  readonly data: DashboardPageQuery;
};

const DashboardPage: PageComponent = () => {
  return (
    <Box>
      <Text>Yuh</Text>
    </Box>
  );
};

DashboardPage.layout = layoutWithData<DashboardPageProps>(
  (page, { viewer }) => <AppLayout {...{ viewer }}>{page}</AppLayout>,
);

export default DashboardPage;
