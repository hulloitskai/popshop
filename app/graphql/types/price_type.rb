# typed: strict
# frozen_string_literal: true

module Types
  class PriceType < BaseObject
    # == Interfaces
    implements NodeType

    # == Fields
    field :amount, String, null: false
    field :amount_cents, Integer, null: false
    field :currency_code, String, null: false
    field :name, String
    field :scope, ScopeType, null: false
    field :units, UnitsType
  end
end
