# typed: strict
# frozen_string_literal: true

module Queries
  class Currency < BaseQuery
    extend T::Sig
    extend T::Helpers

    # == Type
    type Types::CurrencyType, null: true

    # == Arguments
    argument :code, String

    # == Resolver
    sig { params(code: String).returns(T.nilable(Money::Currency)) }
    def resolve(code:) = ::Currencies.find(code)
  end
end
