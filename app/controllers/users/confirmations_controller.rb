# typed: strict
# frozen_string_literal: true

module Users
  class ConfirmationsController < Devise::ConfirmationsController
    # == Actions
    # GET /<resource>/verification?confirmation_token=abcdef
    sig { void }
    def show
      resource = resource_class.confirm_by_token(params[:confirmation_token])
      if resource.errors.empty?
        set_flash_message!(:notice, :confirmed)
        respond_with_navigational(resource) do
          redirect_to(after_confirmation_path_for(resource_name, resource))
        end
      else
        message = resource.errors.full_messages.first
        redirect_to(new_confirmation_path(resource), alert: message)
      end
    end

    # GET /<resource>/verification/resend
    sig { override.void }
    def new
      data = query!("UserSendEmailVerificationInstructionsPageQuery")
      render(
        inertia: "UserSendEmailVerificationInstructionsPage",
        props: { data: },
      )
    end
  end
end
