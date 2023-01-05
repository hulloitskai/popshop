# typed: strict
# frozen_string_literal: true

module Types
  class OrderQuestionResponseType < BaseObject
    # == Interfaces
    implements NodeType

    # == Fields
    field :answer, GraphQL::Types::JSON, null: false
    field :question, OrderQuestionType, null: false
  end
end
