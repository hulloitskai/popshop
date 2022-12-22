# typed: strict
# frozen_string_literal: true

class Currencies < ApplicationService
  sig { void }
  def initialize
    super
    @currencies = T.let(
      Money::Currency.all.index_by(&:iso_code),
      T::Hash[String, Money::Currency],
    )
  end

  sig { returns(T::Array[Money::Currency]) }
  def all
    @currencies.values
  end

  sig { params(code: String).returns(T.nilable(Money::Currency)) }
  def find(code) = @currencies[code]

  sig { params(code: String).returns(Money::Currency) }
  def find!(code)
    find(code) or raise "Currency not found"
  end

  sig { returns(T::Array[String]) }
  def codes
    @currencies.keys
  end
end

class Currencies
  class << self
    sig { returns(T::Array[Money::Currency]) }
    def all = instance.all

    sig { params(code: String).returns(T.nilable(Money::Currency)) }
    def find(code) = instance.find(code)

    sig { params(code: String).returns(Money::Currency) }
    def find!(code) = instance.find!(code)

    sig { returns(T::Array[String]) }
    def codes = instance.codes
  end
end
