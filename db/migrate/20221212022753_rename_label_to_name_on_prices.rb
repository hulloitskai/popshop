# typed: true
# frozen_string_literal: true

class RenameLabelToNameOnPrices < ActiveRecord::Migration[7.0]
  def change
    change_table :prices do |t|
      t.rename :label, :name
      t.change_null :name, false
      t.index %i[product_id name], unique: true
    end
  end
end
