# typed: true
# frozen_string_literal: true

class IndexStripeCheckoutSessionIdOnOrders < ActiveRecord::Migration[7.0]
  def change
    add_index :orders, :stripe_checkout_session_id, unique: true
  end
end
