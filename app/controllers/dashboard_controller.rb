# typed: true
# frozen_string_literal: true

class DashboardController < ApplicationController
  extend T::Sig

  before_action :authenticate_user!

  def show
    if params[:stripe_account_connected].truthy?
      redirect_to(dashboard_path, notice: "Successfully connected with Stripe")
    elsif params[:stripe_account_refresh].truthy?
      redirect_to(dashboard_path, alert: "Failed to connect with Stripe")
    else
      data = query!("DashboardPageQuery")
      render(inertia: "DashboardPage", props: { data: })
    end
  end
end
