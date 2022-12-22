# typed: strict
# frozen_string_literal: true

class OrdersController < ApplicationController
  before_action :set_order, except: :new

  # == Actions
  sig { void }
  def show
    order = T.must(@order)
    authorize!(order)
    order_id = order.to_gid.to_s
    data = query!("OrderPageQuery", { order_id: })
    render(inertia: "OrderPage", props: { data: })
  end

  sig { void }
  def success
    order = T.must(@order)
    order.update!(status: "paid")
    redirect_to(
      product_path(order.product),
      notice: "Order completed successfully.",
    )
  end

  sig { void }
  def cancel
    order = T.must(@order)
    order.update!(status: "cancelled")
    redirect_to(
      product_path(order.product),
      notice: "Order was not completed.",
    )
  end

  private

  # == Filters
  sig { void }
  def set_order
    @order = T.let(@order, T.nilable(Order))
    @order = Order.friendly.find(params[:id])
  end
end
