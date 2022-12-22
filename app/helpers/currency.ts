import { formatValue } from "react-currency-input-field";

export type CurrencyFormattingInfo = {
  readonly code: string;
  readonly exponent: number;
};

export const formatCurrencyAmount = (
  amount: string | number,
  currency: CurrencyFormattingInfo,
): string => {
  const { code, exponent } = currency;
  return formatValue({
    intlConfig: {
      locale: "en-US",
      currency: code,
    },
    value: String(amount),
    decimalScale: exponent || undefined,
  });
};

export const useFormattedCurrencyAmount = (
  amount: string | number,
  currency: CurrencyFormattingInfo,
): string => {
  return useMemo(
    () => formatCurrencyAmount(amount, currency),
    [amount, currency],
  );
};
