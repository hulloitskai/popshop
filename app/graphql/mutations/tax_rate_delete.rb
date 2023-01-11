# typed: strict
# frozen_string_literal: true

module Mutations
  class TaxRateDelete < BaseMutation
    class Payload < T::Struct
      const :success, TrueClass, default: true
      const :account, Account
    end

    # == Fields
    field :account, Types::AccountType
    field :success, Boolean

    # == Arguments
    argument :tax_rate_id, ID, loads: Types::TaxRateType

    # == Resolver
    sig do
      override(
        allow_incompatible: true,
      ).params(
        tax_rate: TaxRate,
        attributes: T.untyped,
      ).returns(Payload)
    end
    def resolve(tax_rate:, **attributes)
      authorize!(tax_rate, to: :delete?)
      account = tax_rate.account!
      tax_rate.destroy!
      Payload.new(account:)
    end
  end
end
