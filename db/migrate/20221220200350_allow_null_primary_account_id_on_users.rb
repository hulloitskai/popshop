# typed: true
# frozen_string_literal: true

class AllowNullPrimaryAccountIdOnUsers < ActiveRecord::Migration[7.0]
  def change
    change_column_null :users, :primary_account_id, true
    add_foreign_key :users, :accounts, column: :primary_account_id
  end
end
