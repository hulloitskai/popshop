# typed: strict
# frozen_string_literal: true

# == Schema Information
#
# Table name: accounts
#
#  id                   :uuid             not null, primary key
#  discarded_at         :datetime
#  name                 :string           not null
#  stripe_account_email :string
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  owner_id             :uuid             not null
#  stripe_account_id    :string
#
# Indexes
#
#  index_accounts_on_owner_id           (owner_id)
#  index_accounts_on_stripe_account_id  (stripe_account_id) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (owner_id => users.id)
#

class Account < ApplicationRecord
  # == Concerns
  include Identifiable
  include Discardable

  # == Attributes
  sig { returns(String) }
  def stripe_account_id!
    stripe_account_id or stripe_account![:id]
  end

  # == Associations
  belongs_to :owner, class_name: "User"

  has_many :products, dependent: :destroy
  has_many :orders, -> { reverse_chronological }, through: :products

  sig { returns(User) }
  def owner!
    owner or raise ActiveRecord::RecordNotFound
  end

  # == Callbacks
  after_create :create_stripe_account
  after_destroy :delete_stripe_account

  # == Methods: Stripe
  sig { returns(T::Boolean) }
  def stripe_connected?
    stripe_account![:requirements][:currently_due].empty?
  end

  sig { returns(T.nilable(Stripe::Account)) }
  def stripe_account
    stripe_account_id.try! do |account_id|
      Stripe::Account.retrieve(account_id)
    end
  end

  sig { returns(Stripe::Account) }
  def stripe_account!
    stripe_account or create_stripe_account
  end

  sig { returns(Stripe::AccountLink) }
  def create_stripe_account_link
    Stripe::AccountLink.create(
      type: :account_onboarding,
      account: stripe_account_id!,
      refresh_url: dashboard_url(stripe_account_refresh: 1),
      return_url: dashboard_url(stripe_account_connected: 1),
    )
  end

  sig { returns(Stripe::Account) }
  def create_stripe_account
    Stripe::Account.create(
      type: "standard",
      email: owner!.email,
      metadata: {
        account_id: id!,
      },
    ).tap do |account|
      update_columns( # rubocop:disable Rails/SkipsModelValidations
        stripe_account_id: account.id,
        stripe_account_email: account.email,
      )
    end
  end

  sig { void }
  def delete_stripe_account
    stripe_account_id.try! do |account_id|
      Stripe::Account.delete(account_id)
    end
  end
end
