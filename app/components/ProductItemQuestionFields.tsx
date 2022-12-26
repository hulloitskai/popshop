import type { ReactElement } from "react";
import { uniq } from "lodash-es";
import {
  questionTypeOrdering,
  questionTypeLabel,
  questionTypeHasChoices,
} from "~/helpers/types/QuestionType";

import { Text } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import type { LooseKeys } from "@mantine/form/lib/types";

import AddIcon from "~icons/heroicons/plus-20-solid";

import { QuestionType } from "~/queries";
import type { ProductItemQuestionFieldsQuestionFragment } from "~/queries";

export type ProductItemQuestionFieldsProps<
  Values,
  TransformValues extends (values: Values) => unknown,
> = {
  readonly form: UseFormReturnType<Values, TransformValues>;
  readonly path: LooseKeys<Values>;
};

export type ProductItemQuestionValues = {
  readonly key: string;
  readonly type: QuestionType;
  readonly prompt: string;
  readonly choices: string[];
};

export type ProductItemQuestionValuesForSubmission = Omit<
  ProductItemQuestionValues,
  "key" | "choices"
> & {
  readonly choices?: string[];
};

const ProductItemFields = <
  Values,
  TransformValues extends (values: Values) => unknown,
>({
  form,
  path,
}: ProductItemQuestionFieldsProps<Values, TransformValues>): ReactElement => {
  const types = useMemo(() => {
    const types = Object.values(QuestionType);
    return sortBy(types, questionTypeOrdering);
  }, []);
  const [choiceInputValue, setChoiceInputValue] = useState("");

  // == Form
  const {
    values: { type, choices },
    getInputProps,
    setFieldValue,
  } = useNestedForm<ProductItemQuestionValues>(form, String(path));

  // == Markup
  return (
    <Stack spacing={4}>
      <TextInput label="Prompt" required {...getInputProps("prompt")} />
      <Select
        label="Response Type"
        data={types.map(type => ({
          value: type,
          label: questionTypeLabel(type),
        }))}
        required
        withinPortal
        {...getInputProps("type")}
      />
      {questionTypeHasChoices(type) && (
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
              "target must be an input",
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
    </Stack>
  );
};

ProductItemFields.initialValues = (
  question?: ProductItemQuestionFieldsQuestionFragment,
): ProductItemQuestionValues => {
  const { prompt, type, choices } = question ?? {};
  return {
    key: randomId(),
    prompt: prompt || "",
    type: type || QuestionType.ShortAnswer,
    choices: choices || [],
  };
};

ProductItemFields.transformValues = ({
  choices,
  ...values
}: ProductItemQuestionValues): ProductItemQuestionValuesForSubmission => {
  const { type } = values;
  return {
    ...omit(values, "key"),
    choices: questionTypeHasChoices(type) ? choices : undefined,
  };
};

export default ProductItemFields;
