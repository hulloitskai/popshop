# typed: strict
# frozen_string_literal: true

module Queries
  class TestEcho < BaseQuery
    extend T::Sig
    extend T::Helpers

    # == Type
    type String, null: false

    # == Arguments
    argument :text, String, required: false

    # == Resolver
    sig { params(text: T.nilable(String)).returns(String) }
    def resolve(text: nil) = text || ""
  end
end
