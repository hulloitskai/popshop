# typed: strict
# frozen_string_literal: true

class ProductItemPolicy < ApplicationPolicy
  # == Rules
  sig { returns(T::Boolean) }
  def edit?
    user = authenticate!
    user.products.include?(record!.product!)
  end

  # == Scopes
  relation_scope(&:kept)

  private

  # == Helpers ==
  sig { returns(ProductItem) }
  def record!
    T.must(record)
  end
end
