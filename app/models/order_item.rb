# typed: strict
# frozen_string_literal: true

# == Schema Information
#
# Table name: order_items
#
#  id              :uuid             not null, primary key
#  subtotal_cents  :integer          not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  order_id        :uuid             not null
#  product_item_id :uuid             not null
#
# Indexes
#
#  index_order_items_on_order_id         (order_id)
#  index_order_items_on_product_item_id  (product_item_id)
#
# Foreign Keys
#
#  fk_rails_...  (order_id => orders.id)
#  fk_rails_...  (product_item_id => product_items.id)
#

class OrderItem < ApplicationRecord
  # == Attributes
  monetize :subtotal_cents,
           with_model_currency: :currency_code,
           numericality: {
             greater_than_or_equal_to: 0,
           }

  # == Associations
  belongs_to :order

  belongs_to :product_item
  has_one :product, through: :product_item
  has_many :questions, through: :product_item

  has_many :question_responses,
           class_name: "OrderQuestionResponse",
           dependent: :destroy

  sig { returns(Order) }
  def order!
    order or raise ActiveRecord::RecordNotFound
  end

  sig { returns(ProductItem) }
  def product_item!
    product_item or raise ActiveRecord::RecordNotFound
  end

  sig { returns(Product) }
  def product!
    product or raise ActiveRecord::RecordNotFound
  end

  # == Validations
  validates :product_item,
            inclusion: {
              in: ->(item) {
                item = T.let(item, OrderItem)
                item.order!.product!.items
              },
              message: "does not bleong to the ordered product",
            }

  # == Validations: Question Responses
  validate :validate_question_responses_count

  # == Callbacks: Subtotal
  before_create :set_subtotal_cents

  # == Methods: Currency
  sig { returns(T.nilable(String)) }
  def currency_code = product&.currency_code

  sig { returns(T.nilable(Money::Currency)) }
  def currency = product&.currency

  # == Methods: Price
  sig { returns(T.nilable(Integer)) }
  def price_cents = product_item&.price_cents

  sig { returns(Integer) }
  def price_cents! = T.must(price_cents)

  sig { returns(T.nilable(Money)) }
  def price = product_item&.price

  # == Methods: Stripe
  sig { returns(T.nilable(String)) }
  def stripe_price_id
    product_item&.stripe_price_id
  end

  sig { returns(String) }
  def stripe_price_id!
    product_item!.stripe_price_id!
  end

  # == Methods: Questions
  sig { returns(T::Array[String]) }
  def question_ids = product_item!.question_ids

  sig { returns(T::Array[OrderQuestion]) }
  def questions_ordered = product_item!.questions_ordered

  # == Methods: Question Responses
  sig { returns(T::Array[OrderQuestionResponse]) }
  def question_responses_ordered
    responses = question_responses.to_a
    responses.index_by(&:question_id).values_at(*T.unsafe(question_ids))
  end

  private

  # == Validations: Question Responses
  sig { void }
  def validate_question_responses_count
    if question_responses.size != questions.size
      errors.add(
        :question_responses,
        :wrong_lenth,
        message: "expected #{questions.size} responses, received \
          #{question_responses.size}",
      )
    end
  end

  # == Callbacks: Subtotal
  sig { void }
  def set_subtotal_cents
    self.subtotal_cents = price_cents!
  end
end
