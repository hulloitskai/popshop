# typed: strict
# frozen_string_literal: true

# == Schema Information
#
# Table name: order_question_responses
#
#  id            :uuid             not null, primary key
#  answer        :jsonb            not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  order_item_id :uuid             not null
#  question_id   :uuid             not null
#
# Indexes
#
#  index_order_question_responses_on_order_item_id  (order_item_id)
#  index_order_question_responses_on_question_id    (question_id)
#
# Foreign Keys
#
#  fk_rails_...  (order_item_id => order_items.id)
#  fk_rails_...  (question_id => order_questions.id)
#

class OrderQuestionResponse < ApplicationRecord
  # == Associations
  belongs_to :question, class_name: "OrderQuestion", inverse_of: :responses
  has_one :product_item, through: :question
  has_one :product, through: :product_item

  belongs_to :order_item
  has_one :order, through: :order_item

  sig { returns(OrderQuestion) }
  def question!
    question or raise ActiveRecord::RecordNotFound
  end

  # == Validations
  validates :answer, presence: true
end
