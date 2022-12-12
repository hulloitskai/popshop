# typed: strict
# frozen_string_literal: true

module Queries
  class Product < BaseQuery
    extend T::Sig
    extend T::Helpers

    # == Type
    type Types::ProductType, null: false

    # == Arguments
    argument :id, ID

    # == Resolver
    sig { params(id: String).returns(T.nilable(::Product)) }
    def resolve(id:)
      product = T.let(
        object_from_id(Types::ProductType, id, context),
        T.nilable(::Product),
      )
      product.try! do |product|
        product = T.let(product, ::Product)
        product if allowed_to?(:show?, product)
      end
    end
  end
end
