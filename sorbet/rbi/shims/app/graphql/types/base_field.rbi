# typed: strong

class Types::BaseField
  prepend ActionPolicy::GraphQL::AuthorizedField
end
