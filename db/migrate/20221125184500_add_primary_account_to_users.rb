# rubocop:disable Rails/SkipsModelValidations
# typed: true
# frozen_string_literal: true

class AddPrimaryAccountToUsers < ActiveRecord::Migration[7.0]
  def change
    add_belongs_to :users,
                   :primary_account,
                   null: true,
                   foreign_key: {
                     to_table: "accounts",
                   },
                   type: :uuid
    User
      .where(primary_account_id: nil)
      .find_each do |user|
        user = T.let(user, User)
        account = Account.create!(owner: user, name: user.name)
        user.update_column("primary_account_id", account.id)
      end
    change_column_null :users, :primary_account_id, false
  end
end
