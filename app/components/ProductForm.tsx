import type { FC } from "react";
import { Input, Text } from "@mantine/core";
import type { FormErrors } from "@mantine/form";

import CurrencyCodeField from "./CurrencyCodeField";

import PriceFields from "./PriceFields";
import type { PriceValues, PriceValuesForSubmission } from "./PriceFields";

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
  "description" | "prices"
> & {
  readonly description: string | null;
  readonly prices: PriceValuesForSubmission[];
};

export type ProductValues = {
  readonly name: string;
  readonly description: string;
  readonly currencyCode: string;
  readonly prices: PriceValues[];
};

const ProductForm: FC<ProductFormProps> = ({
  product,
  loading,
  errors,
  onSubmit: handleSubmit,
}) => {
  // == Form
  const initialValues = useMemo<ProductValues>(() => {
    const { name, description, currencyCode, prices } = product ?? {};
    return {
      name: name || "",
      description: description || "",
      currencyCode: currencyCode || "CAD",
      prices: prices
        ? prices.map(PriceFields.initialValues)
        : [PriceFields.initialValues()],
    };
  }, [product]);
  const form = useForm<
    ProductValues,
    (values: ProductValues) => ProductValuesForSubmission
  >({
    initialValues,
    initialErrors: errors,
    transformValues: ({ description, prices, ...values }) => ({
      ...values,
      description: description || null,
      prices: prices.map(PriceFields.transformValues),
    }),
  });
  const {
    values: { currencyCode, prices },
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
            {...getInputProps("description")}
          />
        </Stack>
        <Box>
          <Text size="lg" weight={700}>
            Pricing
          </Text>
          <Stack spacing={8}>
            <CurrencyCodeField
              label="Currency"
              required
              readOnly={!!product}
              inputContainer={children => (
                <Tooltip
                  label="Changing active currency is not yet supported."
                  withArrow
                  disabled={!product}
                >
                  <div>{children}</div>
                </Tooltip>
              )}
              {...getInputProps("currencyCode")}
            />
            {prices.map(({ key }, index) => (
              <Input.Wrapper
                key={key}
                labelElement="div"
                label={
                  <>
                    {index > 0 ? `Additional Price #${index}` : "Price"}
                    {index > 0 && (
                      <>
                        {" "}
                        <Anchor
                          component="button"
                          type="button"
                          color="red"
                          onClick={() => {
                            removeListItem("prices", index);
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
                  <PriceFields
                    path={`prices.${index}`}
                    showName={prices.length > 1}
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
                const values = PriceFields.initialValues();
                insertListItem("prices", values);
              }}
            >
              Add Price
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
