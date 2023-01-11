# typed: true
# frozen_string_literal: true

class AddStripeTaxRateIdToTaxRates < ActiveRecord::Migration[7.0]
  def change
    add_column :tax_rates, :stripe_tax_rate_id, :string
  end
end
