# typed: strong

class ProductPolicy
  sig { returns(T.nilable(Product)) }
  def record; end
end

class ProductPolicy
  class << self
    sig do
      params(
        args: T.untyped,
        block: T.proc
          .bind(T.attached_class)
          .params(relation: Product::PrivateRelation)
          .returns(Product::PrivateRelation),
      ).void
    end
    def relation_scope(*args, &block); end
  end
end
