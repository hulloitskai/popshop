# typed: strict
# frozen_string_literal: true

module Mutations
  class ProductUpdate < BaseMutation
    class Payload < T::Struct
      const :product, T.nilable(Product)
      const :errors, T.nilable(InputFieldErrors)
    end

    # == Fields
    field :errors, [Types::InputFieldErrorType]
    field :product, Types::ProductType

    # == Arguments
    argument :description, String, required: false
    argument :items, [Types::ProductItemInputType]
    argument :name, String
    argument :product_id, ID, loads: Types::ProductType

    # == Resolver
    sig do
      override(
        allow_incompatible: true,
      ).params(
        product: Product,
        attributes: T.untyped,
      ).returns(Payload)
    end
    def resolve(product:, **attributes)
      authorize!(product, to: :edit?)
      product.attributes = attributes
      if product.save
        Payload.new(product:)
      else
        Payload.new(errors: product.input_field_errors)
      end
    end
  end
end
