import type { PageComponent } from "~/helpers/inertia";
import type { DeepRequired } from "~/helpers/utils";
import type { FormErrors } from "@mantine/form";

import ProductForm from "~/components/ProductForm";

import AlertIcon from "~icons/heroicons/exclamation-triangle-20-solid";

import { ProductUpdateMutationDocument } from "~/queries";
import type { ProductEditPageQuery } from "~/queries";

export type ProductEditPageProps = {
  readonly data: DeepRequired<ProductEditPageQuery, ["viewer"] | ["product"]>;
};

const ProductEditPage: PageComponent<ProductEditPageProps> = ({
  data: { product },
}) => {
  const [errors, setErrors] = useState<FormErrors>({});
  const router = useRouter();

  // == Product
  const { id: productId, deletedAt: deletedAtISO, name } = product;
  const deletedAt = useMemo(() => {
    if (deletedAtISO) {
      return DateTime.fromISO(deletedAtISO);
    }
  }, [deletedAtISO]);

  // == Mutation
  const onError = useApolloErrorCallback("Failed to update product");
  const [runMutation, { loading }] = useMutation(
    ProductUpdateMutationDocument,
    {
      onCompleted: ({ payload: { product, errors } }) => {
        if (product) {
          const { url, name } = product;
          router.visit(url, {
            onSuccess: () => {
              showNotice({ message: `'${name}' has been updated.` });
            },
          });
        } else {
          invariant(errors, "Missing input errors");
          setErrors(formErrors(errors));
          showFormErrors("Could not update product");
        }
      },
      onError,
    },
  );

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
      <Stack spacing={4}>
        <Title order={1} size="h2">
          Edit {name}
        </Title>
        <ProductForm
          onSubmit={values => {
            runMutation({
              variables: {
                input: {
                  productId,
                  ...omit(values, "currencyCode"),
                },
              },
            });
          }}
          disabled={!!deletedAt}
          {...{ product, loading, errors }}
        />
      </Stack>
    </Stack>
  );
};

ProductEditPage.layout = buildLayout<ProductEditPageProps>(
  (page, { data: { viewer } }) => (
    <AppLayout withContainer withGutter containerSize="xs" {...{ viewer }}>
      {page}
    </AppLayout>
  ),
);

export default ProductEditPage;
