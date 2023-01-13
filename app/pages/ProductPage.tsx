import type { PageComponent } from "~/helpers/inertia";
import type { DeepRequired } from "~/helpers/utils";
import { Spoiler, Text } from "@mantine/core";

import OrderForm from "~/components/OrderForm";
import ProductDeleteButton from "~/components/ProductDeleteButton";

import AlertIcon from "~icons/heroicons/exclamation-triangle-20-solid";
import EditIcon from "~icons/heroicons/pencil-20-solid";
import DeleteIcon from "~icons/heroicons/trash-20-solid";

import type { ProductPageQuery } from "~/queries";

type ProductPageProps = {
  readonly data: DeepRequired<ProductPageQuery, ["product"]>;
};

const ProductPage: PageComponent<ProductPageProps> = ({
  data: { product },
}) => {
  const router = useRouter();

  // == Product
  const {
    id: productId,
    deletedAt: deletedAtISO,
    canEdit,
    editUrl,
    name,
    description,
  } = product;
  const deletedAt = useMemo(() => {
    if (deletedAtISO) {
      return DateTime.fromISO(deletedAtISO);
    }
  }, [deletedAtISO]);

  // == Markup
  return (
    <Stack>
      {deletedAt && (
        <Alert
          color="red"
          icon={<AlertIcon />}
          styles={{
            icon: {
              marginRight: 8,
            },
          }}
        >
          This product was deleted on{" "}
          {deletedAt.toLocaleString(DateTime.DATE_FULL)}.
        </Alert>
      )}
      <Stack spacing={8}>
        <Title>{name}</Title>
        {canEdit && (
          <ActionBar>
            <Button component={Link} href={editUrl} leftIcon={<EditIcon />}>
              Edit
            </Button>
            <ProductDeleteButton
              variant="filled"
              color="red"
              leftIcon={<DeleteIcon />}
              disabled={!!deletedAt}
              sx={({ colors }) => ({
                border: `1px ${colors.red[8]} solid`,
              })}
              onDelete={() => {
                router.visit("/dashboard", {
                  onSuccess: () => {
                    showNotice({ message: `'${name}' has been deleted.` });
                  },
                });
              }}
              {...{ productId }}
            >
              Delete
            </ProductDeleteButton>
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
      {!deletedAt && (
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
      )}
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
