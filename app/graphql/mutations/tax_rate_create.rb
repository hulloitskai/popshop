# typed: strict
# frozen_string_literal: true

module Mutations
  class TaxRateCreate < BaseMutation
    class Payload < T::Struct
      const :tax_rate, T.nilable(TaxRate)
      const :errors, T.nilable(InputFieldErrors)
    end

    # == Fields
    field :errors, [Types::InputFieldErrorType]
    field :tax_rate, Types::TaxRateType

    # == Arguments
    argument :account_id, ID, loads: Types::AccountType, required: false
    argument :name, String
    argument :percentage, Float

    # == Resolver
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
      tax_rate = account.tax_rates.build(attributes)
      if tax_rate.save
        Payload.new(tax_rate:)
      else
        Payload.new(errors: tax_rate.input_field_errors)
      end
    end
  end
end
