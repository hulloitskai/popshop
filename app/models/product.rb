# typed: strict
# frozen_string_literal: true

# == Schema Information
#
# Table name: products
#
#  id            :uuid             not null, primary key
#  currency_code :string(3)        not null
#  description   :text
#  discarded_at  :datetime
#  name          :string           not null
#  published_at  :datetime
#  slug          :string           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  account_id    :uuid             not null
#
# Indexes
#
#  index_products_on_account_id           (account_id)
#  index_products_on_account_id_and_name  (account_id,name) UNIQUE
#  index_products_on_account_id_and_slug  (account_id,slug) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (account_id => accounts.id)
#

class Product < ApplicationRecord
  # == Concerns
  include Identifiable
  include Discardable
  include ::Named

  # == Concerns: FriendlyId
  include FriendlyId::Concern
  friendly_id :name, use: %i[slugged scoped], scope: :account

  # == Associations
  belongs_to :account
  has_many :items,
           class_name: "ProductItem",
           dependent: :destroy,
           autosave: true
  has_many :orders, dependent: :destroy_async

  sig { returns(Account) }
  def account!
    account or raise ActiveRecord::RecordNotFound
  end

  sig { override.params(values: T::Enumerable[::ProductItem]).void }
  def items=(values)
    items.kept.where.missing(:order_items).destroy_all
    items.kept.where.associated(:order_items).discard_all
    items.concat(values)
  end

  # == Validations
  validates :name, uniqueness: { scope: :account }
  validates :slug, uniqueness: { scope: :account }
  validates :currency_code, presence: true, inclusion: { in: Currencies.codes }

  validates :items, presence: true
  validates_associated :items

  # == Methods: Currency
  sig { returns(Money::Currency) }
  def currency
    Money::Currency.find(currency_code)
  end
end
