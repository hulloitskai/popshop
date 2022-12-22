# typed: strict
# frozen_string_literal: true

module Mutations
  class AccountOnboardToStripe < BaseMutation
    class Payload < T::Struct
      const :url, String
    end

    field :url, String, null: false

    argument :account_id, ID, loads: Types::AccountType, required: false

    sig do
      override(
        allow_incompatible: true,
      ).params(
        account: T.nilable(Account),
      ).returns(Payload)
    end
    def resolve(account: nil)
      account ||= current_user!.primary_account!
      authorize!(account, to: :edit?)
      account_link = account.create_stripe_account_link
      Payload.new(url: account_link[:url])
    end
  end
end
