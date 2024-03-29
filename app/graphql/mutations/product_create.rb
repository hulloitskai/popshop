# typed: strict
# frozen_string_literal: true

module Mutations
  class ProductCreate < BaseMutation
    class Payload < T::Struct
      const :product, T.nilable(Product)
      const :errors, T.nilable(InputFieldErrors)
    end

    # == Fields
    field :errors, [Types::InputFieldErrorType]
    field :product, Types::ProductType

    # == Arguments
    argument :account_id, ID, loads: Types::AccountType, required: false
    argument :currency_code, String
    argument :description, String, required: false
    argument :items, [Types::ProductItemInputType]
    argument :name, String

    # == Resolver
    sig do
      override(
        allow_incompatible: true,
      ).params(
        items: T::Array[ProductItem],
        account: T.nilable(Account),
        attributes: T.untyped,
      ).returns(Payload)
    end
    def resolve(items:, account: nil, **attributes)
      account ||= current_user!.primary_account!
      authorize!(account, to: :edit?)
      product = account.products.build(items:, **attributes)
      if product.save
        Payload.new(product:)
      else
        Payload.new(errors: product.input_field_errors)
      end
    end
  end
end
