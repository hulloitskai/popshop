# typed: true
# frozen_string_literal: true

class DropIndexOrdersOnAccountIdAndCode < ActiveRecord::Migration[7.0]
  def change
    remove_index :orders, %i[account_id code]
  end
end
