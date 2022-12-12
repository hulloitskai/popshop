# typed: strict
# frozen_string_literal: true

module Types
  class ProductType < BaseObject
    # == Interfaces
    implements NodeType

    # == Fields
    field :account, AccountType, null: false
    field :currency_code, String, null: false
    field :description, String
    field :name, String, null: false
    field :prices, [PriceType], null: false
    field :url, String, null: false

    # == Resolvers
    sig { returns(String) }
    def url
      url_helpers.product_url(object)
    end
  end
end
