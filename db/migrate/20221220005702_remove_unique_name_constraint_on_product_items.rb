# typed: true
# frozen_string_literal: true

class RemoveUniqueNameConstraintOnProductItems < ActiveRecord::Migration[7.0]
  def change
    remove_index :product_items, %i[product_id name]
  end
end
