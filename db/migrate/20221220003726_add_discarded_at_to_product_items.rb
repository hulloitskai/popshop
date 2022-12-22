# typed: true
# frozen_string_literal: true

class AddDiscardedAtToProductItems < ActiveRecord::Migration[7.0]
  def change
    add_column :product_items, :discarded_at, :timestamptz
  end
end
