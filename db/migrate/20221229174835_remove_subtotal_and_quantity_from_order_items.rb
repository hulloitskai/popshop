# typed: true
# frozen_string_literal: true

class RemoveSubtotalAndQuantityFromOrderItems < ActiveRecord::Migration[7.0]
  def change
    change_table :order_items do |t|
      t.remove :subtotal_cents
      t.remove :quantity
    end
  end
end
