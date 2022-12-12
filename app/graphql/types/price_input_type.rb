# typed: strict
# frozen_string_literal: true

module Types
  class PriceInputType < BaseInputObject
    argument :amount, String, required: false
    argument :amount_cents, Integer, required: false
    argument :name, String
    argument :scope, ScopeType
    argument :units, String, required: false

    sig { returns(Price) }
    def prepare
      Price.new(to_h)
    end
  end
end
