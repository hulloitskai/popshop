# typed: strict
# frozen_string_literal: true

module Types
  class CustomerInputType < BaseInputObject
    # == Arguments
    argument :email, String
    argument :first_name, String
    argument :last_name, String

    # == Preparation
    sig { returns(Customer) }
    def prepare
      customer = Customer.find_or_initialize_by(email:)
      customer.attributes = { first_name:, last_name: }
      customer
    end
  end
end
