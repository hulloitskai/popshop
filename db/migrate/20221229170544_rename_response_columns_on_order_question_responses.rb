# rubocop:disable Layout/LineLength
# typed: true
# frozen_string_literal: true

class RenameResponseColumnsOnOrderQuestionResponses < ActiveRecord::Migration[7.0]
  def change
    change_table :order_question_responses do |t|
      t.rename :response, :answer_value
      t.rename :response_text, :answer_text
    end
  end
end
