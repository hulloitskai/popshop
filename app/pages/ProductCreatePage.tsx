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
  const onError = useApolloErrorCallback("Failed to update account");
  const [runMutation, { loading }] = useMutation(
    ProductCreateMutationDocument,
    {
      onCompleted: ({ payload: { product, errors } }) => {
        if (product) {
          router.visit(product.url);
          showNotice({ message: "You've updated your account." });
        } else {
          invariant(errors);
          setErrors(formErrors(errors));
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

ProductCreatePage.layout = layoutWithData<ProductCreatePageProps>(
  (page, { viewer }) => (
    <AppLayout withContainer withGutter containerSize="xs" {...{ viewer }}>
      {page}
    </AppLayout>
  ),
);

export default ProductCreatePage;
