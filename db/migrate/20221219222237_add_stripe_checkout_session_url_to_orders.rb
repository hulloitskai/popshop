# typed: true
# frozen_string_literal: true

class AddStripeCheckoutSessionUrlToOrders < ActiveRecord::Migration[7.0]
  def change
    add_column :orders, :stripe_checkout_session_url, :string
    add_index :orders, :stripe_checkout_session_url, unique: true
  end
end
