# typed: strict
# frozen_string_literal: true

module Mutations
  class ProductUpdate < BaseMutation
    class Payload < T::Struct
      const :product, T.nilable(Product)
      const :errors, T.nilable(ActiveModel::Errors)
    end

    field :errors, [Types::ValidationErrorType]
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
      product.update(attributes)
      if product.valid?
        Payload.new(product:)
      else
        Payload.new(errors: product.errors)
      end
    end
  end
end
