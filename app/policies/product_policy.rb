# typed: strict
# frozen_string_literal: true

class ProductPolicy < ApplicationPolicy
  sig { returns(T::Boolean) }
  def edit?
    user = authenticate!
    user.products.include?(record!)
  end

  private

  # == Helpers ==
  sig { returns(Product) }
  def record!
    T.must(record)
  end
end
