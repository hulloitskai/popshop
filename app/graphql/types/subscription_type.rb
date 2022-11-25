# typed: strict
# frozen_string_literal: true

module Types
  class SubscriptionType < BaseObject
    field :test_subscription, subscription: Subscriptions::TestSubscription
  end
end
