# typed: strict
# frozen_string_literal: true

module Mutations
  class TestMutation < BaseMutation
    class Payload < T::Struct
      const :errors, T.nilable(InputFieldErrors)
      const :model, T.nilable(TestModel)
    end

    # == Fields
    field :errors, [Types::InputFieldErrorType]
    field :model, Types::TestModelType

    # == Arguments
    argument :birthday, Types::DateType, required: false
    argument :name, String

    # == Resolver
    sig do
      override(
        allow_incompatible: true,
      ).params(
        attributes: T.untyped,
      ).returns(Payload)
    end
    def resolve(**attributes)
      model = TestModel.new(**attributes)
      if model.valid?
        Payload.new(model: model)
      else
        Payload.new(errors: InputFieldErrors.from(model.errors))
      end
    end
  end
end
