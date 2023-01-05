# typed: strong

module GlobalID::Identification
  sig { params(options: T.untyped).returns(GlobalID) }
  def to_gid(options = T.unsafe(nil)); end

  sig { params(options: T.untyped).returns(GlobalID) }
  def to_global_id(options = T.unsafe(nil)); end
end

module GlobalID::Locator
  class << self
    sig do
      params(
        gids: T::Array[String],
        options: T.untyped,
      ).returns(T::Array[ActiveRecord::Base])
    end
    def locate_many(gids, options = T.unsafe(nil)); end
  end
end

class ActiveRecord::Base
  include GlobalID::Identification
end
