# typed: strict
# frozen_string_literal: true

module Types
  class OrderItemType < BaseObject
    # == Interfaces
    implements NodeType

    # == Fields
    field :currency, CurrencyType, null: false
    field :product_item, ProductItemType, null: false
    field :quantity, Integer, null: false
    field :subtotal, String, null: false
    field :subtotal_cents, Integer, null: false

    # == Resolvers
    sig { returns(ProductItem) }
    def product_item
      context.dataloader
        .with(Sources::RecordById, ProductItem)
        .load(object.product_item_id)
    end
  end
end
