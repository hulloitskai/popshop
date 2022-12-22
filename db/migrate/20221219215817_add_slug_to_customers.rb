# typed: true
# frozen_string_literal: true

class AddSlugToCustomers < ActiveRecord::Migration[7.0]
  def change
    add_column :customers, :slug, :string, null: false, index: { unique: true }
  end
end
