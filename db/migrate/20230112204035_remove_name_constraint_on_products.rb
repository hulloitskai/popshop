# typed: true
# frozen_string_literal: true

class RemoveNameConstraintOnProducts < ActiveRecord::Migration[7.0]
  def change
    change_table :products do |t|
      t.remove_index %i[account_id name]
      t.change_null :slug, true
    end
  end
end
