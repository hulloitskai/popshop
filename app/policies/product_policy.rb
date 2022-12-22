# typed: strict
# frozen_string_literal: true

class ProductPolicy < ApplicationPolicy
  # == Rules
  sig { returns(T::Boolean) }
  def edit?
    user = authenticate!
    user.products.include?(record!)
  end

  sig { returns(T::Boolean) }
  def order?
    record!.account!.stripe_connected?
  end

  # == Scopes
  relation_scope(&:kept)

  private

  # == Helpers ==
  sig { returns(Product) }
  def record!
    T.must(record)
  end
end
