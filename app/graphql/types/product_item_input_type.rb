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
    argument :questions, [OrderQuestionInputType], required: false
    argument :tax_rate_id, ID, loads: Types::TaxRateType, required: false
    argument :units, String, required: false

    # == Preparation
    sig { returns(ProductItem) }
    def prepare
      if price.blank? && price_cents.blank?
        raise GraphQL::ExecutionError,
              "Invalid ProductItemInput (Expected either price or " \
                "priceCents to not be null)"
      end
      ProductItem.new(to_h)
    end
  end
end
