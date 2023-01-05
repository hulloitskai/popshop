import { OrderQuestionType } from "~/queries";

const OrderQuestionTypeLabels: Record<OrderQuestionType, string> = {
  [OrderQuestionType.ShortAnswer]: "Short answer",
  [OrderQuestionType.LongAnswer]: "Long answer",
  [OrderQuestionType.SingleChoice]: "Single choice",
  [OrderQuestionType.MultipleChoice]: "Multiple choice",
  [OrderQuestionType.Checkbox]: "Checkbox",
};

const OrderQuestionTypeOrdering: Record<OrderQuestionType, number> = {
  [OrderQuestionType.ShortAnswer]: 1,
  [OrderQuestionType.LongAnswer]: 2,
  [OrderQuestionType.SingleChoice]: 3,
  [OrderQuestionType.MultipleChoice]: 4,
  [OrderQuestionType.Checkbox]: 5,
};

const OrderQuestionTypesWithChoices = [
  OrderQuestionType.SingleChoice,
  OrderQuestionType.MultipleChoice,
];

export const orderQuestionTypeLabel = (type: OrderQuestionType): string =>
  OrderQuestionTypeLabels[type];

export const orderQuestionTypeOrdering = (type: OrderQuestionType): number =>
  OrderQuestionTypeOrdering[type];

export const orderQuestionTypeHasChoices = (type: OrderQuestionType): boolean =>
  OrderQuestionTypesWithChoices.includes(type);
