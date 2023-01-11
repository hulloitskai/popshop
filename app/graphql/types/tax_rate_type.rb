# typed: strict
# frozen_string_literal: true

module Types
  class TaxRateType < BaseObject
    # == Interfaces
    implements NodeType

    # == Fields: Authorization
    expose_authorization_rules :edit?, :delete?

    # == Fields
    field :account, AccountType, null: false
    field :name, String, null: false
    field :percentage, Float, null: false

    # == Resolvers
    sig { returns(Account) }
    def account
      context.dataloader
        .with(Sources::RecordById, Account)
        .load(object.account_id)
    end
  end
end
