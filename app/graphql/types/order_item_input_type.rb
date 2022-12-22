# typed: strict
# frozen_string_literal: true

module Types
  class OrderItemInputType < BaseInputObject
    argument :product_item_id, ID, loads: Types::ProductItemType
    argument :quantity, Integer

    sig { returns(OrderItem) }
    def prepare
      OrderItem.new(to_h)
    end
  end
end
