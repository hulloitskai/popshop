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
  friendly_id :name, use: :scoped, scope: :account

  # == Associations
  belongs_to :account

  has_many :prices, dependent: :destroy

  # == Validations
  validates :name, uniqueness: { scope: :account }
  validates :slug, uniqueness: { scope: :account }
  validates :prices, presence: true
end
