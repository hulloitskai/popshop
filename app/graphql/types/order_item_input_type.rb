# typed: strict
# frozen_string_literal: true

module Types
  class OrderItemInputType < BaseInputObject
    argument :product_item_id, ID, loads: Types::ProductItemType
    argument :question_responses,
             [OrderQuestionResponseInputType],
             required: false

    sig { returns(OrderItem) }
    def prepare
      OrderItem.new(to_h)
    end
  end
end
