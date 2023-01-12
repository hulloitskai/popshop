# typed: strict
# frozen_string_literal: true

module Types
  class OrderQuestionType < BaseObject
    # == Interfaces
    implements NodeType

    # == Fields
    field :choices, [String]
    field :optional, Boolean, null: false
    field :prompt, String, null: false
    field :type, OrderQuestionTypeType, null: false
  end
end
