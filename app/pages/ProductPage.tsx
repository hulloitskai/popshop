import type { PageComponent } from "~/helpers/inertia";
import type { DeepRequired } from "~/helpers/utils";
import { Spoiler, Text } from "@mantine/core";

// import OrderCard from "~/components/OrderCard";

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
      {/* <MediaQuery
        largerThan="xs"
        styles={({ spacing }) => ({
          paddingTop: spacing.lg,
          paddingBottom: spacing.lg,
        })}
      >
        <Center>
          <OrderCard w="100%" {...{ product }} />
        </Center>
      </MediaQuery> */}
    </Stack>
  );
};

ProductPage.layout = layoutWithData<ProductPageProps>((page, { viewer }) => (
  <AppLayout withContainer withGutter {...{ viewer }}>
    {page}
  </AppLayout>
));

export default ProductPage;
