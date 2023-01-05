# typed: strict
# frozen_string_literal: true

module Types
  class OrderQuestionResponseInputType < BaseInputObject
    # == Arguments
    argument :answer, GraphQL::Types::JSON
    argument :question_id, ID, loads: OrderQuestionType

    # == Preparation
    sig { returns(OrderQuestionResponse) }
    def prepare
      OrderQuestionResponse.new(to_h)
    end
  end
end
