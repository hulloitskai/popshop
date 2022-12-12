# typed: strict
# frozen_string_literal: true

module Types
  class ScopeType < Types::BaseEnum
    value "PER_ORDER", value: "per_order"
    value "PER_PERSON", value: "per_person"
    value "PER_UNIT", value: "per_unit"
  end
end
