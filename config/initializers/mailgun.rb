# typed: strict
# frozen_string_literal: true

Rails.application.configure do
  config.action_mailer.mailgun_settings = {
    api_host: "api.mailgun.net",
    api_key: ENV["MAILGUN_API_KEY"],
    domain: ENV["MAILGUN_DOMAIN"],
  }
end
