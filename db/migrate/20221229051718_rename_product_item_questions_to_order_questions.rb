# typed: true
# frozen_string_literal: true

class RenameProductItemQuestionsToOrderQuestions < ActiveRecord::Migration[7.0]
  def change
    rename_table :product_item_questions, :order_questions
  end
end
