# typed: strict
# frozen_string_literal: true

module Types
  class ProductItemQuestionInputType < BaseInputObject
    # == Arguments
    argument :choices, [String], required: false
    argument :prompt, String
    argument :type, QuestionTypeType

    # == Preparation
    sig { returns(ProductItemQuestion) }
    def prepare
      ProductItemQuestion.new(to_h)
    end
  end
end
