# typed: strict
# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  extend T::Sig

  default from: "Popshop <popshop@itskai.me>"
  layout "mailer"
end
