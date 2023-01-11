# rubocop:disable GraphQL/ExtractType
# typed: strict
# frozen_string_literal: true

module Types
  class MutationType < BaseObject
    field :test_mutation, mutation: Mutations::TestMutation

    field :account_onboard_to_stripe,
          mutation: Mutations::AccountOnboardToStripe

    field :user_change_email, mutation: Mutations::UserChangeEmail
    field :user_resend_email_confirmation_instructions,
          mutation: Mutations::UserResendEmailConfirmationInstructions
    field :user_update, mutation: Mutations::UserUpdate

    field :product_create, mutation: Mutations::ProductCreate
    field :product_update, mutation: Mutations::ProductUpdate

    field :order_create, mutation: Mutations::OrderCreate

    field :tax_rate_create, mutation: Mutations::TaxRateCreate
    field :tax_rate_delete, mutation: Mutations::TaxRateDelete
  end
end
