# typed: true
# frozen_string_literal: true

class CreateOrders < ActiveRecord::Migration[7.0]
  def change
    create_table :orders, id: :uuid do |t|
      t.string :currency_code, null: false
      t.string :code, null: false
      t.string :status, null: false, index: true
      t.belongs_to :customer, null: false, foreign_key: true, type: :uuid
      t.belongs_to :product, null: false, foreign_key: true, type: :uuid
      t.belongs_to :account, null: false, foreign_key: true, type: :uuid
      t.index %i[account_id code], unique: true

      t.timestamps
    end
  end
end
