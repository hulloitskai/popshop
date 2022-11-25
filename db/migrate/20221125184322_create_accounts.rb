# typed: true
# frozen_string_literal: true

class CreateAccounts < ActiveRecord::Migration[7.0]
  def change
    create_table :accounts, id: :uuid do |t|
      t.string :name, null: false
      t.belongs_to :owner,
                   null: false,
                   foreign_key: {
                     to_table: :users,
                   },
                   type: :uuid

      t.timestamps
    end
  end
end
