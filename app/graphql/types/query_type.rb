# typed: strict
# frozen_string_literal: true

module Types
  class QueryType < BaseObject
    # == Relay
    # Add 'node' and 'nodes' fields.
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # == Fields
    field :test_echo, resolver: Queries::TestEcho

    field :authenticated_viewer, resolver: Queries::AuthenticatedViewer
    field :viewer, resolver: Queries::Viewer
  end
end
