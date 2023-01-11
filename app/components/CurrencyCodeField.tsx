import type { ComponentPropsWithoutRef, FC } from "react";
import { SelectProps, Text } from "@mantine/core";

import { CurrencyCodeFieldQueryDocument } from "~/queries";
import type { CurrencyCodeFieldCurrencyFragment } from "~/queries";

export type CurrencyCodeFieldProps = Omit<SelectProps, "data">;

const CurrencyCodeField: FC<CurrencyCodeFieldProps> = props => {
  const onError = useApolloErrorCallback("Failed to load currencies");
  const { data, loading } = useQuery(CurrencyCodeFieldQueryDocument, {
    variables: {},
    onError,
  });
  const selectData = useMemo(() => {
    const { currencies = [] } = data ?? {};
    return currencies.map(properties => {
      const { code, symbol } = properties;
      return {
        value: code,
        label: `${code} (${symbol})`,
        ...properties,
      };
    });
  }, [data]);
  return (
    <Select
      data={selectData}
      itemComponent={CurrencyCodeSelectItem}
      searchable
      nothingFound="No matching currency"
      placeholder={loading ? "Loading..." : undefined}
      disabled={loading}
      {...props}
    />
  );
};

export default CurrencyCodeField;

type CurrencyCodeSelectItemProps = ComponentPropsWithoutRef<"div"> &
  Omit<CurrencyCodeFieldCurrencyFragment, "__typename">;

const CurrencyCodeSelectItem = forwardRef<
  HTMLDivElement,
  CurrencyCodeSelectItemProps
>(({ name, code, symbol, ...otherProps }, ref) => (
  <Box {...{ ref }} {...otherProps}>
    <Text>
      {code} ({symbol})
    </Text>
    <Text color="gray.6" mt={-4}>
      {name}
    </Text>
  </Box>
));
