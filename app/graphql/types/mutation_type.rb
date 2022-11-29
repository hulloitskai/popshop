# typed: strict
# frozen_string_literal: true

module Types
  class MutationType < BaseObject
    field :test_mutation, mutation: Mutations::TestMutation

    field :account_update, mutation: Mutations::AccountUpdate
  end
end
