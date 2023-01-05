import type { FC } from "react";

import { Checkbox } from "@mantine/core";
import type { InputBaseProps } from "@mantine/core";

import { OrderQuestionType } from "~/queries";
import type { OrderQuestionResponseFieldQuestionFragment } from "~/queries";

export type OrderQuestionResponseFieldProps = Omit<InputBaseProps, "icon"> & {
  readonly question: OrderQuestionResponseFieldQuestionFragment;
  readonly value?: any;
  readonly readOnly?: boolean;
  readonly onChange?: (event: any) => void;
  readonly onBlur?: (event: any) => void;
};

const OrderQuestionResponseField: FC<OrderQuestionResponseFieldProps> = ({
  question: { type, prompt, choices },
  ...otherProps
}) => {
  switch (type) {
    case OrderQuestionType.ShortAnswer:
      return <TextInput label={prompt} {...otherProps} />;

    case OrderQuestionType.LongAnswer:
      return (
        <Textarea
          label={prompt}
          autosize
          minRows={3}
          maxRows={6}
          {...otherProps}
        />
      );

    case OrderQuestionType.SingleChoice:
      invariant(choices, "missing choices for single-choice question");
      return (
        <Select
          label={prompt}
          placeholder="Select one"
          data={choices.map(value => ({ value, label: value }))}
          withinPortal
          {...otherProps}
        />
      );

    case OrderQuestionType.MultipleChoice:
      invariant(choices, "missing choices for multiple-choice question");
      return (
        <MultiSelect
          label={prompt}
          placeholder="Select all that apply"
          data={choices.map(value => ({ value, label: value }))}
          withinPortal
          {...otherProps}
        />
      );

    case OrderQuestionType.Checkbox:
      return <Checkbox label={prompt} {...otherProps} />;

    default:
      return null;
  }
};

export default OrderQuestionResponseField;
