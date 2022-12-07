# typed: strict
# frozen_string_literal: true

module Identifiable
  extend T::Sig
  extend T::Helpers

  abstract!
  requires_ancestor { ApplicationRecord }

  extend ActiveSupport::Concern

  included do
    T.bind(self, T.class_of(ApplicationRecord))

    # == Attributes
    attribute :id, :string, default: -> { SecureRandom.uuid }
  end

  sig { returns(String) }
  def id!
    T.must(id)
  end
end
