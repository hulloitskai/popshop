# typed: strict
# frozen_string_literal: true

module Types
  class QuestionTypeType < Types::BaseEnum
    value "SHORT_ANSWER", value: "short_answer"
    value "LONG_ANSWER", value: "long_answer"
    value "SINGLE_CHOICE", value: "single_choice"
    value "MULTIPLE_CHOICE", value: "multiple_choice"
    value "CHECKBOX", value: "checkbox"
  end
end
