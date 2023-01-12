import type { ReactElement } from "react";
import { uniq } from "lodash-es";
import {
  orderQuestionTypeOrdering,
  orderQuestionTypeLabel,
  orderQuestionTypeHasChoices,
} from "~/helpers/types/OrderQuestionType";

import { Checkbox, Text } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import type { LooseKeys } from "@mantine/form/lib/types";

import AddIcon from "~icons/heroicons/plus-20-solid";

import { OrderQuestionType } from "~/queries";
import type { OrderQuestionFieldsQuestionFragment } from "~/queries";

export type OrderQuestionFieldsProps<
  Values,
  TransformValues extends (values: Values) => unknown,
> = {
  readonly form: UseFormReturnType<Values, TransformValues>;
  readonly path: LooseKeys<Values>;
};

export type OrderQuestionValues = {
  readonly key: string;
  readonly prompt: string;
  readonly type: OrderQuestionType;
  readonly optional: boolean;
  readonly choices: string[];
};

export type OrderQuestionValuesForSubmission = Omit<
  OrderQuestionValues,
  "key" | "choices"
> & {
  readonly choices?: string[];
};

const OrderQuestionFields = <
  Values,
  TransformValues extends (values: Values) => unknown,
>({
  form,
  path,
}: OrderQuestionFieldsProps<Values, TransformValues>): ReactElement => {
  const types = useMemo(() => {
    const types = Object.values(OrderQuestionType);
    return sortBy(types, orderQuestionTypeOrdering);
  }, []);
  const [choiceInputValue, setChoiceInputValue] = useState("");

  // == Form
  const {
    values: { type, choices },
    getInputProps,
    setFieldValue,
  } = useNestedForm<OrderQuestionValues>(form, String(path));

  // == Markup
  return (
    <Stack spacing={4}>
      <TextInput label="Prompt" required {...getInputProps("prompt")} />
      <Select
        label="Response Type"
        data={types.map(type => ({
          value: type,
          label: orderQuestionTypeLabel(type),
        }))}
        required
        withinPortal
        {...getInputProps("type")}
      />
      {orderQuestionTypeHasChoices(type) && (
        <MultiSelect
          label="Choices"
          data={choices.map(choice => ({ value: choice, label: choice }))}
          value={choices}
          required
          rightSection={<></>}
          rightSectionWidth={12}
          withinPortal
          searchable
          creatable
          getCreateLabel={query => (
            <Group spacing={4}>
              <AddIcon />
              <Text span>{query}</Text>
            </Group>
          )}
          searchValue={choiceInputValue}
          onSearchChange={setChoiceInputValue}
          onChange={value => {
            const newChoices = uniq(value.map(choice => choice.trim()));
            setFieldValue("choices", newChoices);
          }}
          onKeyDown={({ code, target }) => {
            invariant(
              target instanceof HTMLInputElement,
              "Target must be an input",
            );
            const value = target.value.trim();
            if (code === "Enter" && value) {
              const newChoices = uniq([...choices, value]);
              setFieldValue("choices", newChoices);
              setChoiceInputValue("");
            }
          }}
          styles={{
            input: {
              paddingTop: 6,
              paddingBottom: 6,
            },
          }}
        />
      )}
      <Checkbox
        label="This question is optional."
        mt={6}
        {...getInputProps("optional", { type: "checkbox" })}
      />
    </Stack>
  );
};

OrderQuestionFields.initialValues = (
  question?: OrderQuestionFieldsQuestionFragment,
): OrderQuestionValues => {
  const { prompt, type, optional, choices } = question ?? {};
  return {
    key: randomId(),
    prompt: prompt || "",
    type: type || OrderQuestionType.ShortAnswer,
    optional: optional ?? false,
    choices: choices || [],
  };
};

OrderQuestionFields.transformValues = ({
  choices,
  ...values
}: OrderQuestionValues): OrderQuestionValuesForSubmission => {
  const { type } = values;
  return {
    ...omit(values, "key"),
    choices: orderQuestionTypeHasChoices(type) ? choices : undefined,
  };
};

export default OrderQuestionFields;
