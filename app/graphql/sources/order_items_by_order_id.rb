# typed: strict
# frozen_string_literal: true

module Sources
  class OrderItemsByOrderId < BaseSource
    sig do
      params(order_ids: T::Array[String])
        .returns(T::Array[T::Array[OrderItem]])
    end
    def fetch(order_ids)
      items = OrderItem.where(order_id: order_ids).to_a
      order_ids.map do |order_id|
        items.extract! do |item|
          item.order_id == order_id
        end
      end
    end
  end
end
