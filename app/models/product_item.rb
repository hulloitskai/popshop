# typed: strict
# frozen_string_literal: true

# == Schema Information
#
# Table name: product_items
#
#  id                :uuid             not null, primary key
#  description       :text
#  discarded_at      :datetime
#  name              :string           not null
#  order_scope       :string           not null
#  price_cents       :integer          not null
#  question_ids      :uuid             default([]), not null, is an Array
#  units             :string
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  product_id        :uuid             not null
#  stripe_price_id   :string
#  stripe_product_id :string
#  tax_rate_id       :uuid
#
# Indexes
#
#  index_product_items_on_product_id         (product_id)
#  index_product_items_on_stripe_price_id    (stripe_price_id) UNIQUE
#  index_product_items_on_stripe_product_id  (stripe_product_id) UNIQUE
#  index_product_items_on_tax_rate_id        (tax_rate_id)
#
# Foreign Keys
#
#  fk_rails_...  (product_id => products.id)
#  fk_rails_...  (tax_rate_id => tax_rates.id)
#

class ProductItem < ApplicationRecord
  # == Concerns
  include Identifiable
  include Discardable
  include ::Named

  # == Attributes
  enumerize :order_scope, in: %w[per_order per_person per_unit]
  monetize :price_cents,
           with_model_currency: :currency_code,
           numericality: {
             greater_than_or_equal_to: 0,
           }

  # == Attributes: Units
  sig { override.returns(T.nilable(String)) }
  def units
    if order_scope == :per_person
      "people"
    else
      super
    end
  end

  sig { override.params(value: T.nilable(String)).returns(T.nilable(String)) }
  def units=(value)
    super(value&.pluralize)
  end

  # == Attributes: Stripe
  sig { returns(String) }
  def stripe_product_id!
    stripe_product_id or stripe_product![:id]
  end

  sig { returns(String) }
  def stripe_price_id!
    stripe_price_id or stripe_product![:default_price]
  end

  # == Attributes
  sig { params(value: T.nilable(String)).returns(T.nilable(String)) }
  def description=(value)
    super(value.presence)
  end

  # == Associations
  belongs_to :product
  has_one :account, through: :product

  belongs_to :tax_rate, optional: true
  has_many :questions,
           class_name: "OrderQuestion",
           dependent: :destroy,
           autosave: true
  has_many :order_items, dependent: :destroy

  sig { returns(Product) }
  def product!
    product or raise ActiveRecord::RecordNotFound
  end

  sig { returns(Account) }
  def account!
    account or raise ActiveRecord::RecordNotFound
  end

  sig { override.params(values: T::Enumerable[OrderQuestion]).void }
  def questions=(values)
    super(values).tap do
      ids = values.map(&:id!)
      if persisted?
        update_column("question_ids", ids) # rubocop:disable Rails/SkipsModelValidations
      else
        self[:question_ids] = ids
      end
    end
  end

  # == Validations
  validates :order_scope, presence: true
  validates :units, presence: true, if: -> {
    T.bind(self, ProductItem)
    order_scope == :per_unit
  }
  validate :validate_name_uniqueness
  validate :validate_questions_count

  # == Validations: Tax Rate
  validate :validate_tax_rate_account

  # == Callbacks
  before_validation :normalize_units
  before_validation :normalize_question_ids

  # == Callbacks: Stripe
  after_create :create_stripe_product
  after_discard :deactivate_stripe_product
  after_destroy :deactivate_stripe_product

  # == Methods
  sig { returns(T::Boolean) }
  def destroyable?
    order_items.blank?
  end

  sig { returns(T::Boolean) }
  def destroy_or_discard
    destroyable? ? !!destroy : discard
  end

  sig { void }
  def destroy_or_discard!
    destroyable? ? destroy! : discard!
  end

  # == Methods: Tax Rate
  sig { returns(T.nilable(Float)) }
  def tax_rate_percentage = tax_rate&.percentage

  # == Methods: Stripe
  sig { returns(T.nilable(String)) }
  def stripe_account_id
    account&.stripe_account_id
  end

  sig { returns(String) }
  def stripe_account_id!
    account!.stripe_account_id!
  end

  sig { returns(T.nilable(Stripe::Product)) }
  def stripe_product
    stripe_product_id.try! do |product_id|
      product_id = T.let(product_id, String)
      Stripe::Product.retrieve(
        product_id,
        { stripe_account: stripe_account_id! },
      )
    end
  end

  sig { returns(Stripe::Product) }
  def stripe_product!
    stripe_product or create_stripe_product
  end

  sig { returns(T.nilable(Stripe::Price)) }
  def stripe_price
    stripe_price_id.try! do |price_id|
      price_id = T.let(price_id, String)
      Stripe::Price.retrieve(
        price_id,
        { stripe_account: stripe_account_id! },
      )
    end
  end

  sig { returns(Stripe::Price) }
  def stripe_price!
    stripe_price or create_stripe_product.then do |product|
      Stripe::Price.retrieve(
        product.default_price,
        { stripe_account: stripe_account_id! },
      )
    end
  end

  sig { returns(T.nilable(String)) }
  def stripe_tax_rate_id
    tax_rate&.stripe_tax_rate_id
  end

  sig { returns(T.nilable(Stripe::TaxRate)) }
  def stripe_tax_rate
    tax_rate&.stripe_tax_rate
  end

  sig { returns(Stripe::Product) }
  def create_stripe_product
    Stripe::Product.create(
      {
        name:,
        unit_label: units,
        default_price_data: {
          currency: currency_code,
          unit_amount: price_cents,
          tax_behavior: :exclusive,
        },
        metadata: {
          product_id:,
          product_item_id: id!,
        },
      },
      { stripe_account: stripe_account_id! },
    ).tap do |product|
      update_columns( # rubocop:disable Rails/SkipsModelValidations
        stripe_product_id: product.id,
        stripe_price_id: product.default_price,
      )
    end
  end

  sig { returns(Stripe::Product) }
  def update_stripe_product
    deactivate_stripe_product
    create_stripe_product
  end

  sig { void }
  def deactivate_stripe_product
    stripe_product_id.try! do |product_id|
      suppress(Stripe::InvalidRequestError) do
        Stripe::Product.update(
          product_id,
          { active: false },
          { stripe_account: stripe_account_id! },
        )
        update_column("stripe_product_id", nil) if persisted? # rubocop:disable Rails/SkipsModelValidations
      end
    end
    stripe_price_id.try! do |price_id|
      suppress(Stripe::InvalidRequestError) do
        Stripe::Price.update(
          price_id,
          { active: false },
          { stripe_account: stripe_account_id! },
        )
        update_column("stripe_price_id", nil) if persisted? # rubocop:disable Rails/SkipsModelValidations
      end
    end
  end

  # == Methods: Account
  sig { returns(T.nilable(String)) }
  def account_id
    account&.id
  end

  # == Methods: Currency
  sig { returns(T.nilable(String)) }
  def currency_code = product&.currency_code

  sig { returns(T.nilable(Money::Currency)) }
  def currency = product&.currency

  # == Methods: Units
  sig { returns(T.nilable(String)) }
  def units_singular
    if order_scope == :per_person
      "person"
    else
      units&.singularize
    end
  end

  # == Methods: Questions
  sig { returns(T::Array[OrderQuestion]) }
  def questions_ordered
    OrderQuestion.find(self[:question_ids])
  end

  private

  # == Validations: Tax Rate
  sig { void }
  def validate_tax_rate_account
    tax_rate.try! do |tax_rate|
      tax_rate = T.let(tax_rate, TaxRate)
      account = self.account || product&.account or raise "Missing account"
      if tax_rate.account != account
        errors.add(:tax_rate, :invalid, message: "must belong to account")
      end
    end
  end

  # == Validations
  sig { void }
  def validate_name_uniqueness
    if product!.items.kept.where.not(id: id).exists?(name: name)
      errors.add(:name, :taken, message: "is already being used")
    end
  end

  # == Validations: Qeustions
  sig { void }
  def validate_questions_count
    if questions.size > 4
      errors.add(
        :questions,
        :too_long,
        message: "exceeded maximum number allowed",
      )
    end
  end

  # == Callbacks
  sig { void }
  def normalize_units
    self.units = nil unless order_scope == :per_unit
  end

  sig { void }
  def normalize_question_ids
    ids = questions.map(&:id!)
    current_ids = T.let(self[:question_ids], T::Array[String])
    next_ids = current_ids + (ids - current_ids) - (current_ids - ids)
    self[:question_ids] = next_ids if next_ids != current_ids
  end
end
