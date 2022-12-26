# typed: strict
# frozen_string_literal: true

module Types
  class ProductItemType < BaseObject
    # == Interfaces
    implements NodeType

    # == Fields
    field :currency, CurrencyType, null: false
    field :description, String
    field :name, String, null: false
    field :order_scope, OrderScopeType, null: false
    field :price, String, null: false
    field :price_cents, Integer, null: false
    field :questions, [ProductItemQuestionType], null: false
    field :units, UnitsType
  end
end
