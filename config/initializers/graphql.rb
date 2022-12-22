# typed: strict
# frozen_string_literal: true

# Load queries and listen to changes.
Rails.application.configure do
  config.to_prepare do
    Schema.queries!.load

    if Rails.env.development?
      Schema.queries!.listen
      at_exit { Schema.queries!.unlisten }
    end
  end
end

# Don't show noisy introspection query in logs.
GraphQL::RailsLogger.configure do |config|
  config.skip_introspection_query = true
end
