# typed: true
# frozen_string_literal: true

class AddAccountIdToCustomers < ActiveRecord::Migration[7.0]
  def change
    add_reference :customers,
                  :account,
                  null: true,
                  foreign_key: true,
                  type: :uuid
    reversible do |dir|
      dir.up do
        Customer.update_all(account_id: Account.first!.id) # rubocop:disable Rails/SkipsModelValidations
      end
    end
    change_column_null :customers, :account_id, false
    add_column :customers, :stripe_customer_id, :string
    remove_index :customers, :email
    add_index :customers, %i[account_id email], unique: true
    add_index :customers, :stripe_customer_id, unique: true
  end
end
