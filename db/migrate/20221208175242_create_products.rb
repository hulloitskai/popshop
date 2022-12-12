# typed: true
# frozen_string_literal: true

class CreateProducts < ActiveRecord::Migration[7.0]
  def change
    create_table :products, id: :uuid do |t|
      t.belongs_to :account, null: false, foreign_key: true, type: :uuid
      t.string :name, null: false
      t.text :description
      t.timestamptz :published_at
      t.timestamptz :discarded_at

      t.timestamps
    end
  end
end
