import type { ReactElement } from "react";
import {
  orderScopeTerms,
  orderScopeOrdering,
  orderScopeLabel,
} from "~/helpers/types/OrderScope";

import { Input, Radio } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import type { LooseKeys } from "@mantine/form/lib/types";

import CurrencyAmountField from "./CurrencyAmountField";
import type { CurrencyAmountFieldProps } from "./CurrencyAmountField";

import OrderQuestionFields from "./OrderQuestionFields";
import type {
  OrderQuestionValues,
  OrderQuestionValuesForSubmission,
} from "./OrderQuestionFields";

import { OrderScope } from "~/queries";
import type { ProductItemFieldsItemFragment } from "~/queries";
import TaxRateField from "./TaxRateField";

export type ProductItemFieldsProps<
  Values,
  TransformValues extends (values: Values) => unknown,
> = Pick<CurrencyAmountFieldProps, "currencyCode"> & {
  readonly form: UseFormReturnType<Values, TransformValues>;
  readonly path: LooseKeys<Values>;
  readonly name?: string;
};

export type ProductItemValues = {
  readonly key: string;
  readonly name: string;
  readonly description: string;
  readonly units: string;
  readonly orderScope: OrderScope;
  readonly price: string;
  readonly taxRateId: string;
  readonly questions: OrderQuestionValues[];
};

export type ProductItemValuesForSubmission = Omit<
  ProductItemValues,
  "key" | "units" | "questions" | "taxRateId"
> & {
  readonly units?: string;
  readonly taxRateId?: string;
  readonly questions: OrderQuestionValuesForSubmission[];
};

const ProductItemFields = <
  Values,
  TransformValues extends (values: Values) => unknown,
>({
  form,
  path,
  currencyCode,
  name,
}: ProductItemFieldsProps<Values, TransformValues>): ReactElement => {
  const scopes = useMemo(() => {
    const scopes = Object.values(OrderScope);
    return sortBy(scopes, orderScopeOrdering);
  }, []);

  // == Form
  const {
    values: { orderScope, questions },
    getInputProps,
    setFieldValue,
    insertListItem,
    removeListItem,
  } = useNestedForm<ProductItemValues>(form, String(path));

  useEffect(() => {
    if (name) {
      setFieldValue("name", name);
    }
  }, [name]);

  // == Markup
  return (
    <Stack spacing={4}>
      {name === undefined && (
        <>
          <TextInput label="Name" required {...getInputProps("name")} />
          <Textarea
            label="Description"
            {...getInputProps("description")}
            autosize
            minRows={1}
            maxRows={2}
          />
        </>
      )}
      <Radio.Group
        label="Priced In Terms Of:"
        required
        offset={4}
        spacing={0}
        orientation="vertical"
        {...getInputProps("orderScope")}
      >
        {scopes.map(orderScope => (
          <Radio
            key={orderScope}
            value={orderScope}
            label={orderScopeTerms(orderScope)}
            styles={{
              radio: { cursor: "pointer" },
              label: { paddingLeft: 8 },
            }}
          />
        ))}
      </Radio.Group>
      <CurrencyAmountField
        label={`Price (${orderScopeLabel(orderScope).toLowerCase()})`}
        required
        {...{ currencyCode }}
        {...getInputProps("price")}
      />
      <TaxRateField
        label="Tax Rate"
        clearable
        {...getInputProps("taxRateId")}
      />
      {orderScope === OrderScope.PerUnit && (
        <TextInput
          label="Units"
          description='Displayed next to the order quantity, like so: "3 boxes"'
          placeholder="boxes"
          required
          {...getInputProps("units")}
        />
      )}
      {!isEmpty(questions) && (
        <>
          <Divider mt={12} mb={4} />
          {questions.map(({ key }, index) => (
            <Input.Wrapper
              key={key}
              labelElement="div"
              label={
                <>
                  Question {index + 1}{" "}
                  <Anchor
                    component="button"
                    type="button"
                    color="red"
                    onClick={() => {
                      removeListItem("questions", index);
                    }}
                  >
                    (remove)
                  </Anchor>
                </>
              }
            >
              <Card withBorder p="xs" pt={4} bg="gray.0">
                <OrderQuestionFields
                  path={`${String(path)}.questions.${index}`}
                  {...{ form }}
                />
              </Card>
            </Input.Wrapper>
          ))}
        </>
      )}
      <Box>
        <Anchor
          component="button"
          color="indigo.5"
          size="sm"
          disabled={questions.length >= 4}
          onClick={() => {
            const values = OrderQuestionFields.initialValues();
            insertListItem("questions", values);
          }}
        >
          Add Order Question
        </Anchor>
      </Box>
    </Stack>
  );
};

ProductItemFields.initialValues = (
  item?: ProductItemFieldsItemFragment,
): ProductItemValues => {
  const { name, description, units, orderScope, price, taxRate, questions } =
    item ?? {};
  return {
    key: randomId(),
    name: name || "",
    description: description || "",
    units: orderScope === OrderScope.PerUnit ? units?.plural || "" : "",
    orderScope: orderScope || OrderScope.PerUnit,
    price: price || "",
    taxRateId: taxRate?.id || "",
    questions: (questions || []).map(OrderQuestionFields.initialValues),
  };
};

ProductItemFields.transformValues = ({
  units,
  questions,
  taxRateId,
  ...values
}: ProductItemValues): ProductItemValuesForSubmission => {
  const { orderScope } = values;
  return {
    ...omit(values, "key"),
    units: orderScope === OrderScope.PerUnit ? units : units,
    taxRateId: taxRateId || undefined,
    questions: questions.map(OrderQuestionFields.transformValues),
  };
};

export default ProductItemFields;
