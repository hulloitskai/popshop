# typed: true
# frozen_string_literal: true

class AddTaxRateToProductItems < ActiveRecord::Migration[7.0]
  def change
    add_reference :product_items, :tax_rate,
                  null: true,
                  foreign_key: true,
                  type: :uuid
  end
end
