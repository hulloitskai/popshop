# typed: true
# frozen_string_literal: true

class CreatePrices < ActiveRecord::Migration[7.0]
  def change
    create_table :prices, id: :uuid do |t|
      t.belongs_to :product, null: false, foreign_key: true, type: :uuid
      t.integer :amount_cents, null: false
      t.string :label
      t.string :scope, null: false
      t.string :units

      t.timestamps
    end
  end
end
