# typed: true
# frozen_string_literal: true

class RenamePricesToProductItems < ActiveRecord::Migration[7.0]
  def change
    rename_table :prices, :product_items
  end
end
