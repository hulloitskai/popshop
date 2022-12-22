# typed: strict
# frozen_string_literal: true

# == Schema Information
#
# Table name: customers
#
#  id                 :uuid             not null, primary key
#  email              :string           not null
#  first_name         :string           not null
#  last_name          :string           not null
#  slug               :string           not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  account_id         :uuid             not null
#  stripe_customer_id :string
#
# Indexes
#
#  index_customers_on_account_id            (account_id)
#  index_customers_on_account_id_and_email  (account_id,email) UNIQUE
#  index_customers_on_stripe_customer_id    (stripe_customer_id) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (account_id => accounts.id)
#

class Customer < ApplicationRecord
  # == Concerns
  include Identifiable
  include Slugged

  # == Concerns: FriendlyId
  include FriendlyId::Concern
  friendly_id :slug

  # == Attributes
  attribute :slug, :string, default: -> { generate_slug }

  sig { returns(String) }
  def stripe_customer_id!
    stripe_customer_id or stripe_customer![:id]
  end

  # == Associations
  belongs_to :account
  has_many :orders, dependent: :destroy_async
  has_many :products, through: :orders

  sig { returns(Account) }
  def account!
    account or raise ActiveRecord::RecordNotFound
  end

  # == Validations
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email,
            presence: true,
            length: {
              maximum: 100,
            },
            email: true,
            uniqueness: {
              scope: :account,
              case_sensitive: false,
            }

  # == Callbacks
  after_destroy :delete_stripe_customer
  after_save :save_stripe_customer

  # == Methods: Name
  sig { returns(String) }
  def name
    "#{first_name} #{last_name}"
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

  sig { returns(T.nilable(Stripe::Customer)) }
  def stripe_customer
    stripe_customer_id.try! do |customer_id|
      customer_id = T.let(customer_id, String)
      Stripe::Customer.retrieve(
        customer_id,
        { stripe_account: stripe_account_id! },
      )
    end
  end

  sig { returns(Stripe::Customer) }
  def stripe_customer!
    stripe_customer or create_stripe_customer
  end

  sig { returns(Stripe::Customer) }
  def create_stripe_customer
    Stripe::Customer.create(
      { email:, name: },
      { stripe_account: stripe_account_id! },
    ).tap do |customer|
      update_column("stripe_customer_id", customer.id) # rubocop:disable Rails/SkipsModelValidations
    end
  end

  sig { returns(Stripe::Customer) }
  def save_stripe_customer
    customer_id = stripe_customer_id
    if customer_id.present?
      Stripe::Customer.update(
        customer_id,
        { name: },
        { stripe_account: stripe_account_id! },
      )
    else
      create_stripe_customer
    end
  end

  sig { returns(T.nilable(Stripe::Customer)) }
  def delete_stripe_customer
    customer_id = stripe_customer_id
    if customer_id.present?
      Stripe::Customer.delete(
        customer_id,
        { stripe_account: stripe_account_id! },
      ).tap do
        update_column("stripe_customer_id", nil) if persisted? # rubocop:disable Rails/SkipsModelValidations
      end
    end
  end
end
