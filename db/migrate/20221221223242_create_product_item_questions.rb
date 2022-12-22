# typed: true
# frozen_string_literal: true

class CreateProductItemQuestions < ActiveRecord::Migration[7.0]
  def change
    create_table :product_item_questions, id: :uuid do |t|
      t.string :prompt, null: false
      t.belongs_to :product_item, null: false, foreign_key: true, type: :uuid
      t.string :type, null: false
      t.string :choices, null: false, array: true, default: []

      t.timestamps
    end
  end
end
