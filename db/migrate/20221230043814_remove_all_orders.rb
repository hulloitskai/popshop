# typed: true
# frozen_string_literal: true

class RemoveAllOrders < ActiveRecord::Migration[7.0]
  disable_ddl_transaction!

  def up
    Order.destroy_all
  end
end
