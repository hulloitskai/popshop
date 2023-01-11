# typed: strict
# frozen_string_literal: true

module Types
  class OrderItemType < BaseObject
    # == Interfaces
    implements NodeType

    # == Fields
    field :currency, CurrencyType, null: false
    field :product_item, ProductItemType, null: false
    field :question_responses, [OrderQuestionResponseType], null: false

    # == Resolvers
    sig { returns(ProductItem) }
    def product_item
      context.dataloader
        .with(Sources::RecordById, ProductItem)
        .load(object.product_item_id)
    end
  end
end
