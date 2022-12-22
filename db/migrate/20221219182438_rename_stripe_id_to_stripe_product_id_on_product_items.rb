# rubocop:disable Layout/LineLength
# typed: true
# frozen_string_literal: true

class RenameStripeIdToStripeProductIdOnProductItems < ActiveRecord::Migration[7.0]
  def change
    rename_column :product_items, :stripe_id, :stripe_product_id
  end
end
