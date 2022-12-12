# typed: strict
# frozen_string_literal: true

class ProductsController < ApplicationController
  # == Filters
  before_action :authenticate_user!
  before_action :set_product, only: :show

  # == Actions
  sig { void }
  def show
    product = T.must(@product)
    authorize!(product)
    product_id = product.to_gid.to_s
    data = query!("ProductPageQuery", { product_id: })
    render(inertia: "ProductPage", props: { data: })
  end

  sig { void }
  def new
    data = query!("ProductCreatePageQuery")
    render(inertia: "ProductCreatePage", props: { data: })
  end

  private

  # == Filters
  sig { void }
  def set_product
    @product = T.let(@product, T.nilable(Product))
    @product = Product.friendly.find(params[:id])
  end
end
