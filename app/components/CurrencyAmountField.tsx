import type { FC } from "react";

import Field from "react-currency-input-field";
import type { CurrencyInputProps as FieldProps } from "react-currency-input-field";

import { InputBase } from "@mantine/core";
import type { InputBaseProps } from "@mantine/core";

import { CurrencyAmountFieldQueryDocument } from "~/queries";

type IntlConfig = NonNullable<FieldProps["intlConfig"]>;

export type CurrencyAmountFieldProps = Omit<InputBaseProps, "component"> &
  Pick<FieldProps, "onBlur" | "onFocus" | "value" | "allowNegativeValue"> & {
    readonly currencyCode: string;
    readonly onChange?: FieldProps["onValueChange"];
  };

const CurrencyAmountField: FC<CurrencyAmountFieldProps> = ({
  currencyCode,
  allowNegativeValue = false,
  value,
  onChange,
  ...otherProps
}) => {
  const onError = useApolloErrorCallback("Failed to load currency information");
  const { data, loading } = useQuery(CurrencyAmountFieldQueryDocument, {
    variables: {
      currencyCode,
    },
    onError,
  });
  const { exponent } = data?.currency ?? {};
  const intlConfig = useMemo<IntlConfig>(
    () => ({ locale: "en-US", currency: currencyCode }),
    [currencyCode],
  );
  return (
    <InputBase
      component={Field}
      decimalScale={exponent || undefined}
      value={loading ? "" : value}
      onValueChange={onChange}
      disabled={loading}
      placeholder={loading ? "Loading..." : undefined}
      {...{ intlConfig, allowNegativeValue }}
      {...otherProps}
    />
  );
};

export default CurrencyAmountField;
