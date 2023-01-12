# typed: strict
# frozen_string_literal: true

class OrderMailer < ApplicationMailer
  # == Emails
  sig { params(order: Order).returns(Mail::Message) }
  def customer_email(order)
    @order = T.let(@order, T.nilable(Order))
    @order = order
    @items_by_product_item = T.let(
      @items_by_product_item,
      T.nilable(T::Hash[ProductItem, T::Array[OrderItem]]),
    )
    @items_by_product_item = order.items_by_product_item
    @product = T.let(@product, T.nilable(Product))
    @product = order.product!
    @customer = T.let(@customer, T.nilable(Customer))
    @customer = order.customer!
    mail(
      to: @customer.email_with_name,
      subject: "Your #{@product.name} order has been confirmed",
    )
  end

  sig { params(order: Order).returns(Mail::Message) }
  def merchant_email(order)
    @order = T.let(@order, T.nilable(Order))
    @order = order
    @items_by_product_item = T.let(
      @items_by_product_item,
      T.nilable(T::Hash[ProductItem, T::Array[OrderItem]]),
    )
    @items_by_product_item = order.items_by_product_item
    @product = T.let(@product, T.nilable(Product))
    @product = order.product!
    @customer = T.let(@customer, T.nilable(Customer))
    @customer = order.customer!
    @merchant = T.let(@merchant, T.nilable(User))
    @merchant = order.account!.owner!
    mail(
      to: @merchant.email_with_name,
      bcc: ENV["ORDER_MERCHANT_EMAIL_BCC"],
      subject: "Order #{order.code} placed for #{@customer.name}",
    )
  end
end
