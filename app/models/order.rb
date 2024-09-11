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
#  subtotal_cents              :integer          not null
#  total_cents                 :integer          not null
#  created_at                  :datetime         not null
#  updated_at                  :datetime         not null
#  customer_id                 :uuid             not null
#  product_id                  :uuid             not null
#  stripe_checkout_session_id  :string
#
# Indexes
#
#  index_orders_on_code                         (code) UNIQUE
#  index_orders_on_customer_id                  (customer_id)
#  index_orders_on_product_id                   (product_id)
#  index_orders_on_status                       (status)
#  index_orders_on_stripe_checkout_session_id   (stripe_checkout_session_id) UNIQUE
#  index_orders_on_stripe_checkout_session_url  (stripe_checkout_session_url) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (customer_id => customers.id)
#  fk_rails_...  (product_id => products.id)
#
# rubocop:enable Layout/LineLength
class Order < ApplicationRecord
  # == Concerns
  include Identifiable
  include FriendlyIdable

  # == Configuration
  friendly_id :code, slug_column: :code

  # == Attributes
  attribute :code, default: -> { generate_code }
  enumerize :status, in: %w[pending paid cancelled], default: "pending"

  monetize :subtotal_cents,
           with_model_currency: :currency_code,
           numericality: {
             greater_than_or_equal_to: 0,
           }
  monetize :total_cents,
           with_model_currency: :currency_code,
           numericality: {
             greater_than_or_equal_to: 0,
           }

  sig { returns(String) }
  def stripe_checkout_session_id!
    stripe_checkout_session_id or stripe_checkout_session![:id]
  end

  sig { returns(String) }
  def stripe_checkout_session_url!
    stripe_checkout_session_url or stripe_checkout_session![:url]
  end

  # == Assocations
  belongs_to :product
  has_one :account, through: :product

  has_many :items, class_name: "OrderItem", dependent: :destroy, autosave: true
  has_many :question_responses, through: :items
  has_many :product_items, through: :items
  has_many :questions, through: :product_items

  belongs_to :customer, autosave: true

  sig { returns(Product) }
  def product!
    product or raise ActiveRecord::RecordNotFound
  end

  sig { returns(Account) }
  def account!
    account or raise ActiveRecord::RecordNotFound
  end

  sig { returns(Customer) }
  def customer!
    customer or raise ActiveRecord::RecordNotFound
  end

  # == Validations
  validates :status, presence: true
  validates :items, presence: true
  validates_associated :items

  # == Validations: Product
  validate :validate_product_account

  # == Validations: Customer
  validate :validate_customer_account

  # == Callbacks
  before_validation :set_subtotal_cents
  before_validation :set_total_cents
  after_update_commit :send_completion_emails

  # == Callbacks: Stripe
  after_create :create_stripe_checkout_session
  after_destroy :expire_stripe_checkout_session

  # == Initialization
  sig { params(args: T.untyped).void }
  def initialize(*args)
    super
    @send_completion_emails = T.let(false, T::Boolean)
  end

  # == Emails
  sig { returns(ActionMailer::MessageDelivery) }
  def customer_email
    OrderMailer.customer_email(self)
  end

  sig { returns(ActionMailer::MessageDelivery) }
  def merchant_email
    OrderMailer.merchant_email(self)
  end

  # == Methods
  sig { returns(T::Boolean) }
  def complete!
    return false unless status == "pending"
    @send_completion_emails = true
    update!(status: "paid")
  end

  # == Methods: Items
  sig { returns(T::Hash[ProductItem, T::Array[OrderItem]]) }
  def items_by_product_item
    items.group_by(&:product_item!)
  end

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
    product_item_quantities = T.let(
      items.group(:product_item).count,
      T::Hash[ProductItem, Integer],
    )
    product_item_quantities.map do |product_item, quantity|
      {
        price: product_item.stripe_price_id!,
        tax_rates: [product_item.stripe_tax_rate_id].compact.presence,
        quantity:,
      }
    end
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
        success_url: complete_order_url(self),
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
    suppress(Stripe::InvalidRequestError) do
      stripe_checkout_session.try! do |session|
        if session.status == "open"
          Stripe::Checkout::Session.expire(
            session.id,
            {},
            { stripe_account: stripe_account_id! },
          )
          update_column("stripe_checkout_session_id", nil) if persisted? # rubocop:disable Rails/SkipsModelValidations
        end
      end
    end
  end

  private

  # == Validations: Product
  sig { void }
  def validate_product_account
    if product!.account != account!
      errors.add(:product, :invalid, message: "must belong to same account")
    end
  end

  # == Validations: Customer
  sig { void }
  def validate_customer_account
    if customer!.account != account!
      errors.add(:customer, :invalid, message: "must belong to same account")
    end
  end

  # == Callbacks
  sig { void }
  def set_subtotal_cents
    items_by_product_item = items.group_by(&:product_item!)
    item_price_cents = items_by_product_item.sum do |product_item, items|
      product_item.price_cents * items.length
    end
    self.subtotal_cents = item_price_cents
  end

  sig { void }
  def set_total_cents
    return if subtotal_cents.blank?
    items_by_product_item = items.group_by(&:product_item!)
    tax_cents = items_by_product_item.sum do |product_item, items|
      product_item.tax_rate_percentage.try! do |percentage|
        percentage = T.let(percentage, Float)
        product_item.price_cents * items.length * percentage / 100
      end || 0
    end.to_i
    self.total_cents = subtotal_cents + tax_cents
  end

  sig { void }
  def send_completion_emails
    return unless @send_completion_emails
    customer_email.deliver_later
    merchant_email.deliver_later
    @send_completion_emails = false
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
