# typed: strict
# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  default from: "Popshop <popshop@itskai.me>"
  layout "mailer"
end
