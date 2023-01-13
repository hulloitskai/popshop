# typed: strict
# frozen_string_literal: true

module Mutations
  class ProductDelete < BaseMutation
    class Payload < T::Struct
      const :success, TrueClass, default: true
      const :account, Account
    end

    # == Fields
    field :account, Types::AccountType
    field :success, Boolean

    # == Arguments
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
      authorize!(product, to: :delete?)
      account = product.account!
      product.destroy_or_discard!
      Payload.new(account:)
    end
  end
end
