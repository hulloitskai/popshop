import type { PageComponent } from "~/helpers/inertia";
import type { DeepRequired } from "~/helpers/utils";

import { Code } from "@mantine/core";

import type { ProductPageQuery } from "~/queries";

type ProductPageProps = {
  readonly data: DeepRequired<ProductPageQuery, ["product"]>;
};

const ProductPage: PageComponent<ProductPageProps> = ({ data }) => {
  return <Code block>{JSON.stringify(data.product, undefined, 2)}</Code>;
};

ProductPage.layout = layoutWithData<ProductPageProps>((page, { viewer }) => (
  <AppLayout withContainer {...{ viewer }}>
    {page}
  </AppLayout>
));

export default ProductPage;
