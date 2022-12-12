# typed: strict
# frozen_string_literal: true

module Types
  class UserType < BaseObject
    # == Interfaces
    implements NodeType

    # == Fields
    field :email, String, null: false
    field :name, String, null: false
    field :primary_account, AccountType, null: false
    field :unconfirmed_email, String
  end
end
