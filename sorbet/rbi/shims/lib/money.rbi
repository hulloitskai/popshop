# typed: strong

class Money::Currency
  class << self
    sig {returns(T::Array[Money::Currency])}
    def all
    end
end
end
