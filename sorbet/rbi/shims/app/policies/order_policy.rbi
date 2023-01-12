# typed: strong

class OrderPolicy
  sig { returns(T.nilable(Order)) }
  def record; end
end

class OrderPolicy
  class << self
    sig do
      params(
        args: T.untyped,
        block: T.proc
          .bind(T.attached_class)
          .params(relation: Order::PrivateRelation)
          .returns(Order::PrivateRelation),
      ).void
    end
    def relation_scope(*args, &block); end
  end
end
