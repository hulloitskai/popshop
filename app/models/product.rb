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
#  index_products_on_account_id_and_slug  (account_id,slug) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (account_id => accounts.id)
#

class Product < ApplicationRecord
  # == Concerns
  include Identifiable
  include Slugged
  include FriendlyIdable
  include Discardable
  include ::Named

  # == Configuration
  friendly_id :name, use: %i[slugged scoped], scope: :account

  # == Associations
  belongs_to :account
  has_many :items,
           class_name: "ProductItem",
           inverse_of: :product,
           dependent: :destroy,
           autosave: true
  has_many :orders, dependent: :destroy, inverse_of: :product

  sig { returns(Account) }
  def account!
    account or raise ActiveRecord::RecordNotFound
  end

  sig { override.params(values: T::Enumerable[::ProductItem]).void }
  def items=(values)
    items.kept.each(&:destroy_or_discard!)
    items.concat(values)
  end

  # == Validations
  validates :slug, uniqueness: { scope: :account }
  validates :currency_code, presence: true, inclusion: { in: Currencies.codes }
  validate :validate_name_uniqueness

  # == Validations: Items
  validates :items, presence: true
  validates_associated :items
  validate :validate_items_count

  # == Callbacks
  before_discard :generate_slug!

  # == Methods
  sig { returns(T::Boolean) }
  def destroyable?
    items.all?(&:destroyable?)
  end

  sig { returns(T::Boolean) }
  def destroy_or_discard
    destroyable? ? !!destroy : discard
  end

  sig { void }
  def destroy_or_discard!
    destroyable? ? destroy! : discard!
  end

  sig { returns(Money::Currency) }
  def currency
    Money::Currency.find(currency_code)
  end

  private

  # == Validations
  sig { void }
  def validate_name_uniqueness
    if account!.products.kept.where.not(id: id).exists?(name: name)
      errors.add(:name, :taken, message: "is already being used")
    end
  end

  # == Validations: Items
  sig { void }
  def validate_items_count
    errors.add(:items, "exceeded maximum number allowed") if items.kept.size > 4
  end
end
