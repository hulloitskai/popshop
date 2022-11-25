# typed: true
# frozen_string_literal: true

class DashboardController < ApplicationController
  extend T::Sig

  def show
    data = query!("DashboardPageQuery")
    render(inertia: "DashboardPage", props: { data: data })
  end
end
