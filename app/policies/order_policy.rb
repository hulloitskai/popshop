# typed: strict
# frozen_string_literal: true

class OrderPolicy < ApplicationPolicy
  # == Rules
  sig { returns(T::Boolean) }
  def edit?
    user = authenticate!
    user.accounts.include?(record!.account)
  end

  # == Scopes
  relation_scope do |relation|
    relation.where.not(status: %w[pending cancelled])
  end

  private

  # == Helpers ==
  sig { returns(Order) }
  def record!
    T.must(record)
  end
end
