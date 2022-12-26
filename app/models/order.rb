# typed: strict
# frozen_string_literal: true

# rubocop:disable Layout/LineLength
# == Schema Information
#
# Table name: orders
#
#  id                          :uuid             not null, primary key
#  code                        :string           not null
#  status                      :string           not null
#  stripe_checkout_session_url :string
#  created_at                  :datetime         not null
#  updated_at                  :datetime         not null
#  account_id                  :uuid             not null
#  customer_id                 :uuid             not null
#  product_id                  :uuid             not null
#  stripe_checkout_session_id  :string
#
# Indexes
#
#  index_orders_on_account_id                   (account_id)
#  index_orders_on_code                         (code) UNIQUE
#  index_orders_on_customer_id                  (customer_id)
#  index_orders_on_product_id                   (product_id)
#  index_orders_on_status                       (status)
#  index_orders_on_stripe_checkout_session_id   (stripe_checkout_session_id) UNIQUE
#  index_orders_on_stripe_checkout_session_url  (stripe_checkout_session_url) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (account_id => accounts.id)
#  fk_rails_...  (customer_id => customers.id)
#  fk_rails_...  (product_id => products.id)
#

class Order < ApplicationRecord
  # == Concerns
  include Identifiable

  # == Concerns: FriendlyId
  include FriendlyId::Concern
  friendly_id :code, slug_column: :code

  # == Attributes
  attribute :code, default: -> { generate_code }
  enumerize :status, in: %w[pending paid cancelled], default: "pending"

  sig { returns(String) }
  def stripe_checkout_session_id!
    stripe_checkout_session_id or stripe_checkout_session![:id]
  end

  sig { returns(String) }
  def stripe_checkout_session_url!
    stripe_checkout_session_url or stripe_checkout_session![:url]
  end

  # == Assocations
  belongs_to :account
  belongs_to :product

  belongs_to :customer, autosave: true
  has_many :items, class_name: "OrderItem", dependent: :destroy, autosave: true
  has_many :product_items, through: :items

  sig { returns(Account) }
  def account!
    account or raise ActiveRecord::RecordNotFound
  end

  sig { returns(Product) }
  def product!
    product or raise ActiveRecord::RecordNotFound
  end

  sig { returns(Customer) }
  def customer!
    customer or raise ActiveRecord::RecordNotFound
  end

  # == Validations
  validates :status, presence: true
  validates :items, presence: true
  validates_associated :items
  validate :validate_product_account

  # == Callbacks
  after_create_commit :create_stripe_checkout_session
  after_destroy_commit :expire_stripe_checkout_session

  # == Methods: Stripe
  sig { returns(T.nilable(String)) }
  def stripe_account_id
    account&.stripe_account_id
  end

  sig { returns(String) }
  def stripe_account_id!
    account!.stripe_account_id!
  end

  sig { returns(T.nilable(String)) }
  def stripe_customer_id
    customer&.stripe_customer_id
  end

  sig { returns(String) }
  def stripe_customer_id!
    customer!.stripe_customer_id!
  end

  sig { returns(T.nilable(Stripe::Checkout::Session)) }
  def stripe_checkout_session
    stripe_checkout_session_id.try! do |session_id|
      session_id = T.let(session_id, String)
      Stripe::Checkout::Session.retrieve(
        session_id,
        { stripe_account: stripe_account_id! },
      )
    end
  end

  sig { returns(Stripe::Checkout::Session) }
  def stripe_checkout_session!
    stripe_checkout_session or create_stripe_checkout_session
  end

  sig { returns(T::Array[T::Hash[Symbol, T.untyped]]) }
  def stripe_checkout_session_line_items
    items.map(&:stripe_checkout_session_line_items)
  end

  sig { returns(T.nilable(Stripe::PaymentIntent)) }
  def stripe_payment_intent
    stripe_checkout_session.try! do |session|
      Stripe::PaymentIntent.retrieve(
        session.payment_intent,
        { stripe_account: stripe_account_id! },
      )
    end
  end

  sig { returns(T.nilable(String)) }
  def stripe_payment_intent_url
    session = stripe_checkout_session or return
    payment_intent = session[:payment_intent] or return
    "https://dashboard.stripe.com/#{stripe_account_id!}/payments/#{payment_intent}"
  end

  sig { returns(Stripe::Checkout::Session) }
  def create_stripe_checkout_session
    Stripe::Checkout::Session.create(
      {
        success_url: success_order_url(self),
        cancel_url: cancel_order_url(self),
        mode: :payment,
        client_reference_id: id!,
        line_items: stripe_checkout_session_line_items,
        customer: stripe_customer_id!,
        payment_intent_data: {
          receipt_email: customer!.email,
        },
        metadata: {
          order_id: id!,
          product_id: product_id,
          customer_id: customer_id,
        },
      },
      { stripe_account: stripe_account_id! },
    ).tap do |session|
      update_columns( # rubocop:disable Rails/SkipsModelValidations
        stripe_checkout_session_id: session.id,
        stripe_checkout_session_url: session.url,
      )
    end
  end

  sig { returns(T.nilable(Stripe::Checkout::Session)) }
  def expire_stripe_checkout_session
    stripe_checkout_session_id.try! do |session_id|
      Stripe::Checkout::Session.expire(
        session_id,
        {},
        { stripe_account: stripe_account_id! },
      )
    end
  end

  private

  # == Validations
  sig { void }
  def validate_product_account
    if product!.account != account!
      errors.add(:product, :invalid, message: "must belong to account")
    end
  end
end

class Order
  class << self
    sig { returns(String) }
    def generate_code
      Nanoid.generate(
        alphabet:
          "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
        size: 16,
      )
    end
  end
end
