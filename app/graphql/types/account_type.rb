# typed: strict
# frozen_string_literal: true

module Types
  class AccountType < BaseObject
    # == Interfaces
    implements NodeType

    # == Fields
    field :name, String, null: false
    field :owner, UserType, null: false
    field :products, [ProductType], null: false

    # == Resolvers
    sig { returns(T::Enumerable[Product]) }
    def products
      object.products.kept
    end
  end
end
