# typed: strict
# frozen_string_literal: true

class ApplicationController < ActionController::Base
  extend T::Sig

  # == Filters
  around_action :set_error_context_around

  # == Modules
  include GraphQL::Querying

  # == Inertia
  inertia_share do
    T.bind(self, ApplicationController)
    flash = self.flash.to_h.presence
    {
      csrf: {
        param: request_forgery_protection_token,
        token: form_authenticity_token,
      },
      flash: flash,
    }.compact
  end

  private

  # == Helpers
  sig { returns(T::Hash[Symbol, T.untyped]) }
  def error_context
    context = current_user.try! do |user|
      user = T.let(user, User)
      { user_id: user.id, user_email: user.email }
    end
    context || {}
  end

  # == Filters
  # sig { void }
  # def debug_action
  #   targets = params[:debug]
  #   if targets.is_a?(String) && targets.split(",").include?("action")
  #     target = "#{self.class.name}##{action_name}"
  #     binding.break(do: "break #{target} pre: delete 0")
  #   end
  # end

  sig { params(block: T.proc.returns(T.untyped)).void }
  def set_error_context_around(&block)
    Rails.error.set_context(**error_context)
    yield
  end
end
