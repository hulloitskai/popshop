# typed: strict
# frozen_string_literal: true

module Users
  class SessionsController < Devise::SessionsController
    # == Actions
    # GET /<resource>/login or /login
    sig { override.void }
    def new
      data = query!("UserLoginPageQuery")
      render(inertia: "UserLoginPage", props: { data: })
    end

    # POST /<resource>/login
    sig { override.void }
    def create
      self.resource = warden.authenticate!(auth_options)
      set_flash_message!(:notice, :signed_in)
      sign_in(resource_name, resource)
      respond_with(resource, location: after_sign_in_path_for(resource))
    end

    private

    sig { override.params(resource: T.untyped).returns(String) }
    def after_sign_in_path_for(resource)
      dashboard_path
    end
  end
end
