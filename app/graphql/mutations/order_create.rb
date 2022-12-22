# typed: strict
# frozen_string_literal: true

module Mutations
  class OrderCreate < BaseMutation
    class Payload < T::Struct
      const :order, T.nilable(Order)
      const :errors, T.nilable(InputFieldErrors)
    end

    field :errors, [Types::InputFieldErrorType]
    field :order, Types::OrderType

    argument :customer, Types::CustomerInputType
    argument :items, [Types::OrderItemInputType]
    argument :product_id, ID, loads: Types::ProductType

    sig do
      override(
        allow_incompatible: true,
      ).params(
        product: Product,
        customer: Customer,
        attributes: T.untyped,
      ).returns(Payload)
    end
    def resolve(product:, customer:, **attributes)
      authorize!(product, to: :order?)
      order = product.orders.build(customer:, **attributes)
      product.account!.tap do |account|
        account = T.let(account, Account)
        customer.account = account
        order.account = account
      end
      if order.save
        Payload.new(order:)
      else
        Payload.new(errors: order.input_field_errors)
      end
    end
  end
end
