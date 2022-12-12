# typed: true
# frozen_string_literal: true

class AddSlugToProducts < ActiveRecord::Migration[7.0]
  def change
    add_column :products, :slug, :string, null: false
    add_index :products, %w[account_id slug], unique: true
  end
end
