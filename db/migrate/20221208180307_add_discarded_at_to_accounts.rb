# typed: true
# frozen_string_literal: true

class AddDiscardedAtToAccounts < ActiveRecord::Migration[7.0]
  def change
    add_column :accounts, :discarded_at, :timestamptz
  end
end
