# typed: true
# frozen_string_literal: true

class AddStripeAccountIdToAccounts < ActiveRecord::Migration[7.0]
  def change
    add_column :accounts, :stripe_account_id, :string
    add_index :accounts, :stripe_account_id, unique: true
  end
end
