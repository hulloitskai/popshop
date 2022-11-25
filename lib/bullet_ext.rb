# typed: strict
# frozen_string_literal: true

return unless defined?(Bullet)

class Bullet::Notification::Base
  module Extension
    extend T::Sig

    # Don't log user.
    sig { returns(T.nilable(String)) }
    def whoami
      nil
    end
  end

  prepend Extension
end
