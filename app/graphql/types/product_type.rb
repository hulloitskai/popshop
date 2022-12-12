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
    field :currency_code, String, null: false
    field :description, String
    field :name, String, null: false
    field :prices, [PriceType], null: false

    # == Resolvers: URLs
    sig { returns(String) }
    def url
      url_helpers.product_url(object)
    end

    sig { returns(String) }
    def edit_url
      url_helpers.edit_product_url(object)
    end
  end
end
