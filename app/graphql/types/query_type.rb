# typed: strict
# frozen_string_literal: true

module Types
  class QueryType < BaseObject
    extend T::Sig
    extend T::Helpers

    # == Relay ==
    # Add 'node' and 'nodes' fields.
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # == Fields ==
    field :test_echo, resolver: Queries::TestEcho

    field :viewer,
          resolver: Queries::Viewer,
          description: "The currently authenticated user."
  end
end
