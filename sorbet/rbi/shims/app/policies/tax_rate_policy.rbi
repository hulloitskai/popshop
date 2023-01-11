# typed: strong

class TaxRatePolicy
  sig { returns(T.nilable(TaxRate)) }
  def record; end
end

class TaxRatePolicy
  class << self
    sig do
      params(
        args: T.untyped,
        block: T.proc
          .params(relation: TaxRate::PrivateRelation)
          .returns(TaxRate::PrivateRelation),
      ).void
    end
    def relation_scope(*args, &block); end
  end
end
