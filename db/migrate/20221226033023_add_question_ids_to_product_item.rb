# typed: true
# frozen_string_literal: true

class AddQuestionIdsToProductItem < ActiveRecord::Migration[7.0]
  def change
    add_column :product_items, :question_ids, :uuid,
               array: true,
               null: false,
               default: []
  end
end
