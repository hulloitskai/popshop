# typed: strict
# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  default from: "Popshop <popshop@itskai.me>",
          reply_to: "Popshop Support <hello@itskai.me>"
  layout "mailer"
end
