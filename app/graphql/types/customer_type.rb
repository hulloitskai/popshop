# typed: strict
# frozen_string_literal: true

module Types
  class CustomerType < BaseObject
    # == Interfaces
    implements NodeType

    # == Fields
    field :account, AccountType, null: false
    field :email, String, null: false
    field :first_name, String, null: false
    field :last_name, String, null: false
  end
end
