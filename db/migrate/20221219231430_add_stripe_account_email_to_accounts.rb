# typed: true
# frozen_string_literal: true

class AddStripeAccountEmailToAccounts < ActiveRecord::Migration[7.0]
  def change
    add_column :accounts, :stripe_account_email, :string
  end
end
