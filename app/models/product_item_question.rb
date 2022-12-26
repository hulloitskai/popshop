# typed: strict
# frozen_string_literal: true

# == Schema Information
#
# Table name: product_item_questions
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
#  index_product_item_questions_on_product_item_id  (product_item_id)
#
# Foreign Keys
#
#  fk_rails_...  (product_item_id => product_items.id)
#

class ProductItemQuestion < ApplicationRecord
  # == Configuration
  self.inheritance_column = nil

  # == Concerns
  include Identifiable

  # == Attributes
  enumerize :type,
            in: %w[short_answer long_answer
                   single_choice multiple_choice
                   checkbox]

  # == Associations
  belongs_to :product_item, inverse_of: :questions

  # == Validations
  validates :type, presence: true
  validates :prompt, presence: true
  validates :choices,
            presence: true,
            if: -> {
              T.bind(self, ProductItemQuestion)
              type.in?(%w[single_choice multiple_choice])
            }
end
