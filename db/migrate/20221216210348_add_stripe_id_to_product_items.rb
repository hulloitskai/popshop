# typed: true
# frozen_string_literal: true

class AddStripeIdToProductItems < ActiveRecord::Migration[7.0]
  def change
    change_table :product_items do |t|
      t.string :stripe_id, index: { unique: true }
    end
  end
end
