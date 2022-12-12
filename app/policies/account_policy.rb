# typed: strict
# frozen_string_literal: true

class AccountPolicy < ApplicationPolicy
  sig { returns(T::Boolean) }
  def edit?
    user = authenticate!
    user.accounts.include?(record!)
  end

  private

  # == Helpers ==
  sig { returns(Account) }
  def record!
    T.must(record)
  end
end
