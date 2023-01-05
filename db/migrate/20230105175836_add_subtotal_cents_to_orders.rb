# rubocop:disable Rails/SkipsModelValidations
# typed: true
# frozen_string_literal: true

class AddSubtotalCentsToOrders < ActiveRecord::Migration[7.0]
  def change
    add_column :orders, :subtotal_cents, :integer
    reversible do |dir|
      dir.up do
        Order.includes(:items).find_each do |order|
          subtotals = T.let(
            order.items.pluck(:subtotal_cents),
            T::Array[Integer],
          )
          order.update_column("subtotal_cents", subtotals.sum)
        end
      end
    end
    change_column_null :orders, :subtotal_cents, false
  end
end
