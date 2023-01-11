# typed: true
# frozen_string_literal: true

class CreateTaxRates < ActiveRecord::Migration[7.0]
  def change
    create_table :tax_rates, id: :uuid do |t|
      t.belongs_to :account, null: false, foreign_key: true, type: :uuid
      t.string :name, null: false
      t.float :percentage, null: false

      t.timestamps
      t.index %i[account_id name],
              name: "index_tax_rates_uniqueness",
              unique: true
    end
  end
end
