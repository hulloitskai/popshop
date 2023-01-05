# typed: strict
# frozen_string_literal: true

module Types
  class OrderQuestionInputType < BaseInputObject
    # == Arguments
    argument :choices, [String], required: false
    argument :prompt, String
    argument :type, OrderQuestionTypeType

    # == Preparation
    sig { returns(OrderQuestion) }
    def prepare
      OrderQuestion.new(to_h)
    end
  end
end
