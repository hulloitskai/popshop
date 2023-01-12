# typed: true
# frozen_string_literal: true

# Preview all emails at http://localhost:3000/rails/mailers/order_mailer
class OrderMailerPreview < ActionMailer::Preview
  def initialize(*args)
    super
    @order = Order.first!
  end

  def customer_email
    OrderMailer.customer_email(order)
  end

  def merchant_email
    OrderMailer.merchant_email(order)
  end

  private

  attr_reader :order
end
