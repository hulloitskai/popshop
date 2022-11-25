# typed: true
# frozen_string_literal: true

class RemovePrimaryAccountForeignKeyOnUsers < ActiveRecord::Migration[7.0]
  def change
    remove_foreign_key :users, :accounts, column: :primary_account_id
  end
end
