import type { ReactElement } from "react";
import { scopeLabel } from "~/helpers/types/Scope";

import titleCase from "voca/title_case";

import { Radio } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import type { LooseKeys } from "@mantine/form/lib/types";

import CurrencyAmountField from "./CurrencyAmountField";
import type { CurrencyAmountFieldProps } from "./CurrencyAmountField";

import { PriceFormFieldsPriceFragment, Scope } from "~/queries";

export type PriceFieldsProps<
  Values,
  TransformValues extends (values: Values) => unknown,
> = Pick<CurrencyAmountFieldProps, "currencyCode"> & {
  readonly form: UseFormReturnType<Values, TransformValues>;
  readonly path: LooseKeys<Values>;
  readonly showName?: boolean;
};

export type PriceValues = {
  readonly key: string;
  readonly amount: string;
  readonly name: string;
  readonly scope: Scope;
  readonly units: string;
};

export type PriceValuesForSubmission = Omit<PriceValues, "key" | "units"> & {
  readonly units?: string;
};

const PriceFields = <
  Values,
  TransformValues extends (values: Values) => unknown,
>({
  form,
  path,
  currencyCode,
  showName,
}: PriceFieldsProps<Values, TransformValues>): ReactElement => {
  // == Form
  const {
    values: { scope, name },
    isTouched,
    getInputProps,
    setFieldValue,
  } = useNestedForm<PriceValues>(form, String(path));

  // == Effects
  useDidUpdate(() => {
    if (isTouched("scope")) {
      const generatedName = titleCase(scopeLabel(scope));
      if (generatedName !== name) {
        setFieldValue("name", generatedName);
      }
    }
  }, [scope]);

  // == Markup
  return (
    <Stack spacing={4}>
      {showName && <TextInput label="Name" {...getInputProps("name")} />}
      <Radio.Group
        label="Scope"
        required
        offset={2}
        {...getInputProps("scope")}
      >
        {Object.values(Scope).map(scope => (
          <Radio
            key={scope}
            value={scope}
            label={scopeLabel(scope)}
            styles={{
              radio: { cursor: "pointer" },
              label: { paddingLeft: 8 },
            }}
          />
        ))}
      </Radio.Group>
      <CurrencyAmountField
        label="Amount"
        required
        {...{ currencyCode }}
        {...getInputProps("amount")}
      />
      {scope === Scope.PerUnit && (
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

PriceFields.initialValues = (
  price?: PriceFormFieldsPriceFragment,
): PriceValues => {
  const { name: initialName, scope: initialScope, amount, units } = price ?? {};
  const scope = initialScope || Scope.PerUnit;
  const name = initialName || titleCase(scopeLabel(scope));
  return {
    key: randomId(),
    name,
    scope,
    amount: amount || "",
    units: scope === Scope.PerUnit ? units?.plural || "" : "",
  };
};

PriceFields.transformValues = ({
  units,
  ...values
}: PriceValues): PriceValuesForSubmission => {
  const { scope } = values;
  return {
    ...omit(values, "key"),
    units: scope === Scope.PerUnit ? units : units,
  };
};

export default PriceFields;
