# typed: true
# frozen_string_literal: true

class RenameColumnsOnProductItems < ActiveRecord::Migration[7.0]
  def change
    change_table :product_items do |t|
      t.rename :amount_cents, :price_cents
      t.rename :scope, :order_scope
    end
  end
end
