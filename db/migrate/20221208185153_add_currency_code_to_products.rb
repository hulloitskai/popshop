# typed: true
# frozen_string_literal: true

class AddCurrencyCodeToProducts < ActiveRecord::Migration[7.0]
  def change
    add_column :products, :currency_code, "CHAR(3)", null: false
  end
end
