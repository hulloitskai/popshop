# typed: true
# frozen_string_literal: true

class AddStripePriceIdToProductItems < ActiveRecord::Migration[7.0]
  def change
    add_column :product_items, :stripe_price_id, :string
    add_index :product_items, :stripe_price_id, unique: true
  end
end
