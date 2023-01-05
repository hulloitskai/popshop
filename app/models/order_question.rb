# typed: strict
# frozen_string_literal: true

# == Schema Information
#
# Table name: order_questions
#
#  id              :uuid             not null, primary key
#  choices         :string           default([]), not null, is an Array
#  prompt          :string           not null
#  type            :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  product_item_id :uuid             not null
#
# Indexes
#
#  index_order_questions_on_product_item_id  (product_item_id)
#
# Foreign Keys
#
#  fk_rails_...  (product_item_id => product_items.id)
#

class OrderQuestion < ApplicationRecord
  # == Configuration
  self.inheritance_column = nil

  # == Concerns
  include Identifiable

  # == Attributes
  enumerize :type, in: %w[short_answer long_answer
                          single_choice multiple_choice
                          checkbox]

  # == Associations
  belongs_to :product_item, inverse_of: :questions
  has_one :product, through: :product_item

  has_many :responses,
           class_name: "OrderQuestionResponse",
          foreign_key: :question_id,
          inverse_of: :question,
          dependent: :destroy

  # == Validations
  validates :type, presence: true
  validates :prompt, presence: true
  validates :choices,
            presence: true,
            if: -> {
              T.bind(self, OrderQuestion)
              type.in?(%w[single_choice multiple_choice])
            }
end
