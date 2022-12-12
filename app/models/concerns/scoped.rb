# typed: strict
# frozen_string_literal: true

module Scoped
  extend T::Sig
  extend T::Helpers

  abstract!
  requires_ancestor { ApplicationRecord }

  extend ActiveSupport::Concern

  included do
    T.bind(self, T.class_of(ApplicationRecord))

    # == Dependencies
    requires_columns :scope

    # == Attributes
    enumerize :scope, in: %i[per_order per_person per_unit]

    # == Validations
    validates :scope, presence: true
  end
end
