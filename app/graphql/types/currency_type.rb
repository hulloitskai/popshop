# typed: strict
# frozen_string_literal: true

module Types
  class CurrencyType < Types::BaseObject
    # == Fields
    field :code, String, null: false, method: :iso_code
    field :exponent, Integer, null: false
    field :name, String, null: false
    field :symbol, String, null: false
  end
end
