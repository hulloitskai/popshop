# typed: true
# frozen_string_literal: true

class UseJsonbAnswerOnOrderQuestionResponses < ActiveRecord::Migration[7.0]
  def change
    change_table :order_question_responses do |t|
      t.remove :answer_text
      t.remove :answer_value
      t.jsonb :answer, null: false
    end
  end
end
