# rubocop:disable Rails/SkipsModelValidations
# typed: true
# frozen_string_literal: true

class AddAccountIdToOrders < ActiveRecord::Migration[7.0]
  def change
    add_reference :orders,
                  :account,
                  null: true,
                  foreign_key: true,
                  type: :uuid

    reversible do |dir|
      dir.up do
        Order.includes(:product).find_each do |order|
          order = T.let(order, Order)
          order.update_column("account_id", order.product!.account_id)
        end
      end
    end

    change_column_null :orders, :account_id, false
  end
end
