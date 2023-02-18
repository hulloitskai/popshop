# typed: true
# frozen_string_literal: true

class TestController < ApplicationController
  def show
    name = "Big Papa"
    data = query!("TestPageQuery", { name: })
    render(inertia: "TestPage", props: { name:, data: })
  end
end
