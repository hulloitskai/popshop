import type { FC } from "react";
import { Input, Text } from "@mantine/core";
import type { FormErrors } from "@mantine/form";

import CurrencyCodeField from "./CurrencyCodeField";

import ProductItemFields from "./ProductItemFields";
import type {
  ProductItemValues,
  ProductItemValuesForSubmission,
} from "./ProductItemFields";

import AddIcon from "~icons/heroicons/plus-circle-20-solid";

import type { Maybe } from "~/queries";
import type { ProductFormProductFragment } from "~/queries";

export type ProductFormProps = {
  readonly product?: Maybe<ProductFormProductFragment>;
  readonly loading: boolean;
  readonly errors: FormErrors;
  readonly onSubmit: (submission: ProductValuesForSubmission) => void;
};

export type ProductValuesForSubmission = Omit<
  ProductValues,
  "description" | "items"
> & {
  readonly description: string | null;
  readonly items: ProductItemValuesForSubmission[];
};

export type ProductValues = {
  readonly name: string;
  readonly description: string;
  readonly currencyCode: string;
  readonly items: ProductItemValues[];
};

const ProductForm: FC<ProductFormProps> = ({
  product,
  loading,
  errors,
  onSubmit: handleSubmit,
}) => {
  // == Form
  const initialValues = useMemo<ProductValues>(() => {
    const { name, description, currency, items } = product ?? {};
    return {
      name: name || "",
      description: description || "",
      currencyCode: currency?.code || "CAD",
      items: items
        ? items.map(ProductItemFields.initialValues)
        : [ProductItemFields.initialValues()],
    };
  }, [product]);
  const form = useForm<
    ProductValues,
    (values: ProductValues) => ProductValuesForSubmission
  >({
    initialValues,
    initialErrors: errors,
    transformValues: ({ description, items, ...values }) => ({
      ...values,
      description: description || null,
      items: items.map(ProductItemFields.transformValues),
    }),
  });
  const {
    values: { name, currencyCode, items },
    reset,
    setErrors,
    getInputProps,
    insertListItem,
    removeListItem,
    onSubmit,
  } = form;

  // == Effects
  useDidUpdate(() => setErrors(errors), [errors]);
  useDidUpdate(reset, [initialValues]);

  // == Markup
  return (
    <form onSubmit={onSubmit(handleSubmit)}>
      <Stack>
        <Stack spacing={8}>
          <TextInput
            label="Name"
            placeholder="Tasting Box"
            required
            {...getInputProps("name")}
          />
          <Textarea
            label="Description"
            placeholder="A box of local wines and cheeses!"
            autosize
            minRows={2}
            maxRows={10}
            {...getInputProps("description")}
          />
          <CurrencyCodeField
            label="Currency"
            required
            readOnly={!!product}
            inputContainer={children => (
              <Tooltip
                label="You cannot change the currency of a product."
                withArrow
                disabled={!product}
              >
                <div>{children}</div>
              </Tooltip>
            )}
            {...getInputProps("currencyCode")}
          />
        </Stack>
        <Box>
          <Text size="lg" weight={700}>
            Items
          </Text>
          <Text size="sm" color="dimmed" mt={-4}>
            Add one or more items that customers can order.
          </Text>
          <Stack spacing={8}>
            {items.map(({ key }, index) => (
              <Input.Wrapper
                key={key}
                labelElement="div"
                label={
                  <>
                    Item {index + 1}
                    {index > 0 && (
                      <>
                        {" "}
                        <Anchor
                          component="button"
                          type="button"
                          color="red"
                          onClick={() => {
                            removeListItem("items", index);
                          }}
                        >
                          (remove)
                        </Anchor>
                      </>
                    )}
                  </>
                }
                required={index === 0}
              >
                <Card withBorder p="sm" pt={8}>
                  <ProductItemFields
                    path={`items.${index}`}
                    name={items.length === 1 ? name : undefined}
                    {...{ form, currencyCode }}
                  />
                </Card>
              </Input.Wrapper>
            ))}
            <Button
              variant="default"
              size="xs"
              leftIcon={<AddIcon />}
              styles={{ leftIcon: { marginRight: 6 } }}
              onClick={() => {
                const values = ProductItemFields.initialValues();
                insertListItem("items", values);
              }}
            >
              Add Item
            </Button>
          </Stack>
        </Box>
        <Button type="submit" {...{ loading }}>
          {product ? "Save" : "Create"}
        </Button>
      </Stack>
    </form>
  );
};

export default ProductForm;
