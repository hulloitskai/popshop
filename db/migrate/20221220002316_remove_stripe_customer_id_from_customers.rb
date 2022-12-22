# typed: true
# frozen_string_literal: true

class RemoveStripeCustomerIdFromCustomers < ActiveRecord::Migration[7.0]
  def change
    remove_column :customers, :stripe_customer_id, :string
  end
end
