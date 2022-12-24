import type { PageComponent } from "~/helpers/inertia";
import type { DeepRequired } from "~/helpers/utils";
import type { FormErrors } from "@mantine/form";

import ProductForm from "~/components/ProductForm";

import { ProductCreateMutationDocument } from "~/queries";
import type { ProductCreatePageQuery } from "~/queries";

export type ProductCreatePageProps = {
  readonly data: DeepRequired<ProductCreatePageQuery, ["viewer"]>;
};

const ProductCreatePage: PageComponent<ProductCreatePageProps> = () => {
  const [errors, setErrors] = useState<FormErrors>({});
  const router = useRouter();
  const onError = useApolloErrorCallback("Failed to create product");
  const [runMutation, { loading }] = useMutation(
    ProductCreateMutationDocument,
    {
      onCompleted: ({ payload: { product, errors } }) => {
        if (product) {
          const { url } = product;
          router.visit(url);
        } else {
          invariant(errors);
          setErrors(formErrors(errors));
          showAlert({ message: "Failed to create product." });
        }
      },
      onError,
    },
  );
  return (
    <Stack spacing={4}>
      <Title order={1} size="h2">
        New Product
      </Title>
      <ProductForm
        onSubmit={values => {
          runMutation({
            variables: {
              input: {
                ...values,
              },
            },
          });
        }}
        {...{ loading, errors }}
      />
    </Stack>
  );
};

ProductCreatePage.layout = buildLayout<ProductCreatePageProps>(
  (page, { data: { viewer } }) => (
    <AppLayout withContainer withGutter containerSize="xs" {...{ viewer }}>
      {page}
    </AppLayout>
  ),
);

export default ProductCreatePage;
