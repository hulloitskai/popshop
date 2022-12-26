# typed: strict
# frozen_string_literal: true

module Types
  class ProductItemQuestionType < BaseObject
    # == Interfaces
    implements NodeType

    # == Fields
    field :choices, [String]
    field :prompt, String, null: false
    field :type, QuestionTypeType, null: false
  end
end
