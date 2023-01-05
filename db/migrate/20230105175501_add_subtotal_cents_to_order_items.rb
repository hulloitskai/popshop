# rubocop:disable Rails/SkipsModelValidations
# typed: true
# frozen_string_literal: true

class AddSubtotalCentsToOrderItems < ActiveRecord::Migration[7.0]
  def change
    add_column :order_items, :subtotal_cents, :integer
    reversible do |dir|
      dir.up do
        OrderItem.includes(:product_item).find_each do |item|
          item.update_column("subtotal_cents", item.product_item.price_cents)
        end
      end
    end
    change_column_null :order_items, :subtotal_cents, false
  end
end
