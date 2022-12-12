# typed: strict
# frozen_string_literal: true

module Mutations
  class ProductUpdate < BaseMutation
    class Payload < T::Struct
      const :product, T.nilable(Product)
      const :errors, T.nilable(InputFieldErrors)
    end

    field :errors, [Types::InputFieldErrorType]
    field :product, Types::ProductType

    argument :description, String, required: false
    argument :name, String
    argument :prices, [Types::PriceInputType]
    argument :product_id, ID, loads: Types::ProductType

    sig do
      override(
        allow_incompatible: true,
      ).params(
        product: Product,
        prices: T::Array[Price],
        attributes: T.untyped,
      ).returns(Payload)
    end
    def resolve(product:, prices:, **attributes)
      authorize!(product, to: :edit?)
      Product.transaction do
        product.prices.destroy_all
        product.prices.concat(prices)
        product.update(attributes)
      end
      if product.valid?
        Payload.new(product:)
      else
        Payload.new(errors: product.input_field_errors)
      end
    end
  end
end
