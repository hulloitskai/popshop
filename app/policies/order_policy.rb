# typed: strict
# frozen_string_literal: true

class OrderPolicy < ApplicationPolicy
  # == Rules
  sig { returns(T::Boolean) }
  def show?
    user = authenticate!
    user.accounts.include?(record!.account)
  end

  alias_rule :edit?, to: :show?

  # == Scopes
  relation_scope do |relation|
    user = authenticate!
    relation
      .where(account: user.accounts)
      .where.not(status: %w[pending cancelled])
  end

  private

  # == Helpers ==
  sig { returns(Order) }
  def record!
    T.must(record)
  end
end
