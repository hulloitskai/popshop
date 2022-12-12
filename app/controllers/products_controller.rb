# typed: strict
# frozen_string_literal: true

class ProductsController < ApplicationController
  # == Filters
  before_action :authenticate_user!, except: :show
  before_action :set_product, except: :new

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

  sig { void }
  def edit
    product = T.must(@product)
    authorize!(product)
    product_id = product.to_gid.to_s
    data = query!("ProductEditPageQuery", { product_id: })
    render(inertia: "ProductEditPage", props: { data: })
  end

  private

  # == Filters
  sig { void }
  def set_product
    @product = T.let(@product, T.nilable(Product))
    @product = Product.friendly.find(params[:id])
  end
end
