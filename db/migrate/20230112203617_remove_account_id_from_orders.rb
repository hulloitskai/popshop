# typed: true
# frozen_string_literal: true

class RemoveAccountIdFromOrders < ActiveRecord::Migration[7.0]
  def change
    remove_column :orders, :account_id, :string
  end
end
