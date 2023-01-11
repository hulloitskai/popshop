# typed: true
# frozen_string_literal: true

class RemoveSubtotalCentsFromOrderItems < ActiveRecord::Migration[7.0]
  def change
    remove_column :order_items, :subtotal_cents, :string
  end
end
