# typed: strict
# frozen_string_literal: true

module Types
  class AccountType < BaseObject
    # == Interfaces
    implements NodeType

    # == Fields: Authorization
    expose_authorization_rules :edit?, :delete?

    # == Fields
    field :is_stripe_connected, Boolean, null: false, method: :stripe_connected?
    field :name, String, null: false
    field :orders, OrderType.connection_type, null: false
    field :owner, UserType, null: false
    field :products, [ProductType], null: false, authorized_scope: true

    # == Resolvers
    sig { returns(GraphQL::Connections::Base) }
    def orders
      orders = authorized_scope(object.orders)
      GraphQL::Connections::Stable.new(
        orders,
        keys: %i[created_at],
        desc: true,
      )
    end
  end
end
