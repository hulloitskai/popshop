# typed: strict
# frozen_string_literal: true

module Queries
  class Order < BaseQuery
    extend T::Sig
    extend T::Helpers

    # == Type
    type Types::OrderType, null: false

    # == Arguments
    argument :id, ID

    # == Resolver
    sig { params(id: String).returns(T.nilable(::Order)) }
    def resolve(id:)
      order = T.let(
        object_from_id(Types::OrderType, id, context),
        T.nilable(::Order),
      )
      order.try! do |order|
        order = T.let(order, ::Order)
        order if allowed_to?(:show?, order)
      end
    end
  end
end
