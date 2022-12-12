# typed: strict
# frozen_string_literal: true

# == Schema Information
#
# Table name: prices
#
#  id           :uuid             not null, primary key
#  amount_cents :integer          not null
#  name         :string           not null
#  scope        :string           not null
#  units        :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  product_id   :uuid             not null
#
# Indexes
#
#  index_prices_on_product_id           (product_id)
#  index_prices_on_product_id_and_name  (product_id,name) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (product_id => products.id)
#

class Price < ApplicationRecord
  # == Concerns
  include Scoped

  # == Attributes: Amount
  monetize :amount_cents,
           with_model_currency: :currency_code,
           numericality: {
             greater_than_or_equal_to: 0,
           }

  sig { returns(T.nilable(String)) }
  def currency_code
    product&.currency_code
  end

  # == Attributes: Units
  sig { override.returns(T.nilable(String)) }
  def units
    if scope == "per_person"
      "people"
    else
      super
    end
  end

  sig { returns(T.nilable(String)) }
  def units_singular
    if scope == "per_person"
      "person"
    else
      units&.singularize
    end
  end

  # == Associations
  belongs_to :product

  sig { returns(Product) }
  def product!
    product or raise ActiveRecord::RecordNotFound
  end

  # == Validations
  validates :scope, presence: true
  validates :units, presence: true, if: -> {
    T.bind(self, Price)
    scope == :per_unit
  }

  # == Callbacks
  before_validation :normalize_units

  private

  # == Callbacks
  sig { void }
  def normalize_units
    self.units = if scope == :per_unit
      self[:units]&.pluralize
    end
  end
end
