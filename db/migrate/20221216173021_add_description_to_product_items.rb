# typed: true
# frozen_string_literal: true

class AddDescriptionToProductItems < ActiveRecord::Migration[7.0]
  def change
    add_column :product_items, :description, :text
  end
end
