# typed: true
# frozen_string_literal: true

class AddStripeCheckoutSessionIdToOrders < ActiveRecord::Migration[7.0]
  def change
    add_column :orders, :stripe_checkout_session_id, :string
  end
end
