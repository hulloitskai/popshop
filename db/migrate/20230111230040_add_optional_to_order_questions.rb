# typed: true
# frozen_string_literal: true

class AddOptionalToOrderQuestions < ActiveRecord::Migration[7.0]
  def change
    add_column :order_questions, :optional, :boolean,
               null: false,
               default: false
  end
end
