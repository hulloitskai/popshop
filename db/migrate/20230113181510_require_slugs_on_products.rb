# rubocop:disable Rails/SkipsModelValidations
# typed: true
# frozen_string_literal: true

class RequireSlugsOnProducts < ActiveRecord::Migration[7.0]
  def change
    Product.where(slug: nil).find_each do |product|
      product.update_column("slug", Product.generate_slug)
    end
    change_column_null :products, :slug, false
  end
end
