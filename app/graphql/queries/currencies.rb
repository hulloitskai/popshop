# typed: strict
# frozen_string_literal: true

module Queries
  class Currencies < BaseQuery
    extend T::Sig
    extend T::Helpers

    # == Type
    type [Types::CurrencyType], null: false

    # == Resolver
    sig { returns(T::Array[Money::Currency]) }
    def resolve
      @currency = T.let(@currency, T.nilable(T::Array[Money::Currency]))
      @currency ||= Money::Currency.all.uniq(&:iso_code)
    end
  end
end
