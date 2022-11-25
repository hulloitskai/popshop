# typed: true
# frozen_string_literal: true

class DashboardController < ApplicationController
  extend T::Sig

  before_action :authenticate_user!

  def show
    data = query!("DashboardPageQuery")
    render(inertia: "DashboardPage", props: { data: data })
  end
end
