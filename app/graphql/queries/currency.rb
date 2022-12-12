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
    sig { params(code: String).returns(Money::Currency) }
    def resolve(code:)
      Money::Currency.find(code)
    end
  end
end
