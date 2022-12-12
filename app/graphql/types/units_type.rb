# typed: strict
# frozen_string_literal: true

module Types
  class UnitsType < Types::BaseObject
    # == Fields
    field :plural, String, null: false, method: :itself
    field :singular, String, null: false, method: :singularize
  end
end
