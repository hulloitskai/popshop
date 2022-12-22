import type { ReactElement } from "react";
import {
  orderScopeTerms,
  orderScopeOrdering,
  orderScopeLabel,
} from "~/helpers/types/OrderScope";

import { Radio } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import type { LooseKeys } from "@mantine/form/lib/types";

import CurrencyAmountField from "./CurrencyAmountField";
import type { CurrencyAmountFieldProps } from "./CurrencyAmountField";

import { OrderScope } from "~/queries";
import type { ProductItemFieldsItemFragment } from "~/queries";

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
  readonly units: string;
  readonly orderScope: OrderScope;
  readonly price: string;
};

export type ProductItemValuesForSubmission = Omit<
  ProductItemValues,
  "key" | "units"
> & {
  readonly units?: string;
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
    values: { orderScope },
    getInputProps,
    setFieldValue,
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
        <TextInput label="Name" required {...getInputProps("name")} />
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
      {orderScope === OrderScope.PerUnit && (
        <TextInput
          label="Units"
          description='Displayed next to the order quantity, like so: "3 boxes"'
          placeholder="boxes"
          required
          {...getInputProps("units")}
        />
      )}
    </Stack>
  );
};

ProductItemFields.initialValues = (
  item?: ProductItemFieldsItemFragment,
): ProductItemValues => {
  const { name, units, orderScope, price } = item ?? {};
  return {
    key: randomId(),
    name: name || "",
    units: orderScope === OrderScope.PerUnit ? units?.plural || "" : "",
    orderScope: orderScope || OrderScope.PerUnit,
    price: price || "",
  };
};

ProductItemFields.transformValues = ({
  units,
  ...values
}: ProductItemValues): ProductItemValuesForSubmission => {
  const { orderScope } = values;
  return {
    ...omit(values, "key"),
    units: orderScope === OrderScope.PerUnit ? units : units,
  };
};

export default ProductItemFields;
