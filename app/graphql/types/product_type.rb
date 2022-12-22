# typed: strict
# frozen_string_literal: true

module Types
  class ProductType < BaseObject
    # == Interfaces
    implements NodeType

    # == Fields: Authorization
    expose_authorization_rules :edit?, :delete?

    # == Fields: URLs
    field :edit_url, String, null: false
    field :url, String, null: false

    # == Fields
    field :account, AccountType, null: false
    field :currency, CurrencyType, null: false
    field :description, String
    field :items, [ProductItemType], null: false, authorized_scope: true
    field :name, String, null: false

    # == Resolvers: URLs
    sig { returns(String) }
    def url
      product_url(object)
    end

    sig { returns(String) }
    def edit_url
      edit_product_url(object)
    end

    # == Resolvers
    sig { returns(Account) }
    def account
      context.dataloader
        .with(Sources::RecordById, Account)
        .load(object.account_id)
    end
  end
end
