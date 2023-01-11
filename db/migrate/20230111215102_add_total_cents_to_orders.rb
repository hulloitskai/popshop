# typed: true
# frozen_string_literal: true

class AddTotalCentsToOrders < ActiveRecord::Migration[7.0]
  def change
    add_column :orders, :total_cents, :integer
    Order.find_each do |order|
      order = T.let(order, Order)
      item_cents = order.items.sum(&:price_cents!)
      item_tax_cents = order.items.sum(&:tax_cents!)
      order.update!(
        subtotal_cents: item_cents,
        total_cents: item_cents + item_tax_cents,
      )
    end
    change_column_null :orders, :total_cents, false
  end
end
