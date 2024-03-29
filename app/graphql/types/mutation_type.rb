# rubocop:disable GraphQL/ExtractType
# typed: strict
# frozen_string_literal: true

module Types
  class MutationType < BaseObject
    field :test_mutation, mutation: Mutations::TestMutation

    field :account_onboard_to_stripe,
          mutation: Mutations::AccountOnboardToStripe

    field :user_change_email, mutation: Mutations::UserChangeEmail
    field :user_send_email_verification_instructions,
          mutation: Mutations::UserSendEmailVerificationInstructions
    field :user_send_password_reset_instructions,
          mutation: Mutations::UserSendPasswordResetInstructions
    field :user_update, mutation: Mutations::UserUpdate

    field :product_create, mutation: Mutations::ProductCreate
    field :product_delete, mutation: Mutations::ProductDelete
    field :product_update, mutation: Mutations::ProductUpdate

    field :order_create, mutation: Mutations::OrderCreate

    field :tax_rate_create, mutation: Mutations::TaxRateCreate
    field :tax_rate_delete, mutation: Mutations::TaxRateDelete
  end
end
