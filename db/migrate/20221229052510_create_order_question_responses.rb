# typed: true
# frozen_string_literal: true

class CreateOrderQuestionResponses < ActiveRecord::Migration[7.0]
  def change
    create_table :order_question_responses, id: :uuid do |t|
      t.belongs_to :question,
                   null: false,
                   foreign_key: { to_table: :order_questions },
                   type: :uuid
      t.belongs_to :order_item, null: false, foreign_key: true, type: :uuid
      t.string :response
      t.text :response_text

      t.timestamps
    end
  end
end
