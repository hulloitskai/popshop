# typed: strict
# frozen_string_literal: true

module Sources
  class ProductItemsByProductId < BaseSource
    sig do
      params(product_ids: T::Array[String])
        .returns(T::Array[T::Array[ProductItem]])
    end
    def fetch(product_ids)
      items = ProductItem.kept.where(product_id: product_ids).to_a
      product_ids.map do |product_id|
        items.extract! do |item|
          item.product_id == product_id
        end
      end
    end
  end
end
