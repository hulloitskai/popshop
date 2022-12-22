# typed: true
# frozen_string_literal: true

class CreateOrderItems < ActiveRecord::Migration[7.0]
  def change
    create_table :order_items, id: :uuid do |t|
      t.belongs_to :order, null: false, foreign_key: true, type: :uuid
      t.belongs_to :product_item, null: false, foreign_key: true, type: :uuid
      t.integer :quantity, null: false
      t.integer :subtotal_cents, null: false

      t.timestamps
    end
  end
end
