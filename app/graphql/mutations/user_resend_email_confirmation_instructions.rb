# typed: strict
# frozen_string_literal: true

module Mutations
  class UserResendEmailConfirmationInstructions < BaseMutation
    class Payload < T::Struct
      const :user, User
    end

    field :user, Types::UserType

    sig { override.params(attributes: T.untyped).returns(Payload) }
    def resolve(**attributes)
      user = current_user!
      if user.pending_reconfirmation?
        user.resend_confirmation_instructions
      else
        raise GraphQL::ExecutionError, "Email is already confirmed."
      end
      Payload.new(user:)
    end
  end
end
