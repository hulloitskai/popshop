# typed: strict
# frozen_string_literal: true

module Queries
  class Viewer < BaseQuery
    extend T::Sig
    extend T::Helpers

    # == Type
    type Types::UserType, null: true
    description "The currently authenticated user."

    # == Resolver
    sig { returns(T.nilable(User)) }
    def resolve = current_user
  end
end
