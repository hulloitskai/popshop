# typed: true
# frozen_string_literal: true

class AddUniquenessConstraintToNameOnProducts < ActiveRecord::Migration[7.0]
  def change
    add_index :products, %i[account_id name], unique: true
  end
end
