# typed: strict
# frozen_string_literal: true

module Mutations
  class ProductCreate < BaseMutation
    class Payload < T::Struct
      const :product, T.nilable(Product)
      const :errors, T.nilable(InputFieldErrors)
    end

    field :errors, [Types::InputFieldErrorType]
    field :product, Types::ProductType

    argument :account_id, ID, loads: Types::AccountType, required: false
    argument :currency_code, String
    argument :description, String, required: false
    argument :name, String
    argument :prices, [Types::PriceInputType]

    sig do
      override(
        allow_incompatible: true,
      ).params(
        account: T.nilable(Account),
        attributes: T.untyped,
      ).returns(Payload)
    end
    def resolve(account: nil, **attributes)
      account ||= current_user!.primary_account!
      authorize!(account, to: :edit?)
      product = account.products.create(attributes)
      if product.valid?
        Payload.new(product:)
      else
        Payload.new(errors: product.input_field_errors)
      end
    end
  end
end
