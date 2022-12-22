# typed: strict
# frozen_string_literal: true

# Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
Rails.application.routes.draw do
  # == Healthcheck
  Healthcheck.routes(self)

  # == Devise
  devise_for :users,
             except: ["passwords"],
            controllers: {
              sessions: "users/sessions",
              registrations: "users/registrations",
            },
            path: :user,
            path_names: {
              sign_in: :login,
              sign_out: :logout,
              sign_up: :register,
              edit: :settings,
            }

  # == API
  scope :api do
    mount GraphiQL::Rails::Engine,
          at: :/,
          as: :graphiql,
          graphql_path: "/api/graphql"
    scope :graphql, controller: :graphql do
      get :/, to: redirect("/api")
      post :/, action: :execute, as: :graphql
    end
  end

  # == Pages
  root "home#show"
  get :dashboard, to: "dashboard#show"
  get :test, to: "test#show"
  resources :products, only: %i[show new edit]
  resources :orders, only: :show do
    member do
      get :success
      get :cancel
    end
  end

  # == Errors
  scope controller: :errors do
    match "/404", action: :not_found, via: :all
    match "/500", action: :internal_server_error, via: :all
    match "/401", action: :unauthorized, via: :all
  end

  # == Internal
  authenticate :user, ->(user) { user.admin? } do
    # == Good Job
    mount GoodJob::Engine, at: "/good_job"

    # == Mailcatcher
    if Rails.env.development?
      get "/mailcatcher", to: redirect("//localhost:1080", status: 302)
    end
  end
end
