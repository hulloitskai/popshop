# typed: strict
# frozen_string_literal: true

# == Schema Information
#
# Table name: tax_rates
#
#  id                 :uuid             not null, primary key
#  name               :string           not null
#  percentage         :float            not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  account_id         :uuid             not null
#  stripe_tax_rate_id :string
#
# Indexes
#
#  index_tax_rates_on_account_id  (account_id)
#  index_tax_rates_uniqueness     (account_id,name) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (account_id => accounts.id)
#

class TaxRate < ApplicationRecord
  # == Concerns
  include Identifiable
  include ::Named

  # == Associations
  belongs_to :account

  sig { returns(Account) }
  def account!
    account or raise ActiveRecord::RecordNotFound
  end

  # == Validations
  validates :name, uniqueness: { scope: :account }
  validates :percentage, presence: true, numericality: { greater_than: 0.0 }

  # == Callbacks: Stripe
  after_create_commit :create_stripe_tax_rate
  after_destroy_commit :deactivate_stripe_tax_rate

  # == Methods: Stripe
  sig { returns(T.nilable(String)) }
  def stripe_account_id
    account&.stripe_account_id
  end

  sig { returns(String) }
  def stripe_account_id!
    account!.stripe_account_id!
  end

  sig { returns(T.nilable(Stripe::TaxRate)) }
  def stripe_tax_rate
    stripe_tax_rate_id.try! do |tax_rate_id|
      tax_rate_id = T.let(tax_rate_id, String)
      Stripe::Product.retrieve(
        tax_rate_id,
        { stripe_account: stripe_account_id! },
      )
    end
  end

  sig { returns(Stripe::TaxRate) }
  def stripe_tax_rate!
    stripe_tax_rate or create_stripe_tax_rate
  end

  sig { returns(Stripe::TaxRate) }
  def create_stripe_tax_rate
    Stripe::TaxRate.create(
      {
        display_name: name,
        percentage:,
        inclusive: false,
      },
      { stripe_account: stripe_account_id! },
    ).tap do |tax_rate|
      update_column("stripe_tax_rate_id", tax_rate.id) # rubocop:disable Rails/SkipsModelValidations
    end
  end

  sig { returns(Stripe::TaxRate) }
  def update_stripe_tax_rate
    deactivate_stripe_tax_rate
    create_stripe_tax_rate
  end

  sig { void }
  def deactivate_stripe_tax_rate
    stripe_tax_rate_id.try! do |tax_rate_id|
      Stripe::TaxRate.update(
        tax_rate_id,
        { active: false },
        { stripe_account: stripe_account_id! },
      )
    end
  end
end
