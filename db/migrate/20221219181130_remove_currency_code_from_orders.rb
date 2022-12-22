# typed: true
# frozen_string_literal: true

class RemoveCurrencyCodeFromOrders < ActiveRecord::Migration[7.0]
  def change
    remove_column :orders, :currency_code, :string
  end
end
