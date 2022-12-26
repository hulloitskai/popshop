import { QuestionType } from "~/queries";

const QuestionTypeLabels: Record<QuestionType, string> = {
  [QuestionType.ShortAnswer]: "Short answer",
  [QuestionType.LongAnswer]: "Long answer",
  [QuestionType.SingleChoice]: "Single choice",
  [QuestionType.MultipleChoice]: "Multiple choice",
  [QuestionType.Checkbox]: "Checkbox",
};

const QuestionTypeOrdering: Record<QuestionType, number> = {
  [QuestionType.ShortAnswer]: 1,
  [QuestionType.LongAnswer]: 2,
  [QuestionType.SingleChoice]: 3,
  [QuestionType.MultipleChoice]: 4,
  [QuestionType.Checkbox]: 5,
};

const QuestionTypesWithChoices = [
  QuestionType.SingleChoice,
  QuestionType.MultipleChoice,
];

export const questionTypeLabel = (type: QuestionType): string =>
  QuestionTypeLabels[type];

export const questionTypeOrdering = (type: QuestionType): number =>
  QuestionTypeOrdering[type];

export const questionTypeHasChoices = (type: QuestionType): boolean =>
  QuestionTypesWithChoices.includes(type);
