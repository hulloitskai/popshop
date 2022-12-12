# typed: strong

class AccountPolicy
  sig { returns(T.nilable(Account)) }
  def record; end
end
