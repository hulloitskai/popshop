import type { PageComponent } from "~/helpers/inertia";
import type { DeepRequired } from "~/helpers/utils";
import type { FormErrors } from "@mantine/form";

import ProductForm from "~/components/ProductForm";

import { ProductUpdateMutationDocument } from "~/queries";
import type { ProductEditPageQuery } from "~/queries";

export type ProductEditPageProps = {
  readonly data: DeepRequired<ProductEditPageQuery, ["viewer"] | ["product"]>;
};

const ProductEditPage: PageComponent<ProductEditPageProps> = ({
  data: { product },
}) => {
  const { id: productId, name } = product;
  const [errors, setErrors] = useState<FormErrors>({});
  const router = useRouter();
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
          invariant(errors);
          setErrors(formErrors(errors));
          showAlert({ message: "Failed to update product." });
        }
      },
      onError,
    },
  );
  return (
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
        {...{ product, loading, errors }}
      />
    </Stack>
  );
};

ProductEditPage.layout = layoutWithData<ProductEditPageProps>(
  (page, { viewer }) => (
    <AppLayout withContainer withGutter containerSize="xs" {...{ viewer }}>
      {page}
    </AppLayout>
  ),
);

export default ProductEditPage;
