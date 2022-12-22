# typed: strict
# frozen_string_literal: true

module Types
  class ProductItemInputType < BaseInputObject
    # == Arguments
    argument :description, String, required: false
    argument :name, String
    argument :order_scope, OrderScopeType
    argument :price, String, required: false
    argument :price_cents, Integer, required: false
    argument :units, String, required: false

    # == Preparation
    sig { returns(ProductItem) }
    def prepare
      ProductItem.new(to_h)
    end
  end
end
