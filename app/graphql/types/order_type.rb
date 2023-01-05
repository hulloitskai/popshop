# rubocop:disable GraphQL/ExtractType
# typed: strict
# frozen_string_literal: true

module Types
  class OrderType < BaseObject
    # == Interfaces
    implements NodeType

    # == Fields: Timestamps
    field :created_at, DateTimeType, null: false

    # == Fields: URLs
    field :url, String, null: false

    # == Fields
    field :account, AccountType, null: false
    field :code, String, null: false
    field :customer, CustomerType, null: false
    field :items, [OrderItemType], null: false
    field :product, ProductType, null: false
    field :stripe_checkout_session_url,
          String,
          null: false,
          method: :stripe_checkout_session_url!
    field :stripe_payment_intent_url, String
    field :subtotal, String, null: false
    field :subtotal_cents, Integer, null: false

    # == Resolvers: URLs
    sig { returns(String) }
    def url
      order_url(object)
    end

    # == Resolvers
    sig { returns(Account) }
    def account
      context.dataloader
        .with(Sources::RecordById, Account)
        .load(object.account_id)
    end

    sig { returns(Customer) }
    def customer
      context.dataloader
        .with(Sources::RecordById, Customer)
        .load(object.customer_id)
    end

    sig { returns(T::Array[OrderItem]) }
    def items
      context.dataloader
        .with(Sources::OrderItemsByOrderId)
        .load(object.id)
    end

    sig { returns(Product) }
    def product
      context.dataloader
        .with(Sources::RecordById, Product)
        .load(object.product_id)
    end
  end
end
