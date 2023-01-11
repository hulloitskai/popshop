# typed: strict
# frozen_string_literal: true

class TaxRatePolicy < ApplicationPolicy
  # == Rules
  sig { returns(T::Boolean) }
  def edit?
    user = authenticate!
    user.accounts.include?(record!.account)
  end

  private

  # == Helpers ==
  sig { returns(TaxRate) }
  def record!
    T.must(record)
  end
end
