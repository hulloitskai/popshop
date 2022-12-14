# typed: strict
# frozen_string_literal: true

module Resolver
  extend T::Sig
  extend T::Helpers

  abstract!
  requires_ancestor { Kernel }

  # == Concerns
  include Routing

  # == Methods
  sig { abstract.returns(GraphQL::Query::Context) }
  def context; end

  sig { returns(Popshop::Application) }
  def app
    T.cast(Rails.application, Popshop::Application)
  end

  # sig { returns(T.nilable(GraphQLController)) }
  # def controller
  #   context[:controller]
  # end

  # sig { returns(GraphQLController) }
  # def controller!
  #   controller = self.controller
  #   raise "not executing within a controller" if controller.nil?
  #   controller
  # end

  # sig { returns(T.nilable(GraphQLChannel)) }
  # def channel
  #   context[:channel]
  # end

  # sig { returns(GraphQLChannel) }
  # def channel!
  #   channel = self.channel
  #   raise "not executing within a channel" if channel.nil?
  #   channel
  # end

  sig { returns(T.nilable(User)) }
  def current_user
    context[:current_user]
  end

  sig { returns(User) }
  def current_user!
    user = current_user
    user or raise GraphQL::ExecutionError, "Not authenticated."
  end
end
