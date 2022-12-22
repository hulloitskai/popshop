# typed: strong

class ProductItemPolicy
  sig { returns(T.nilable(ProductItem)) }
  def record; end
end

class ProductItemPolicy
  class << self
    sig do
      override.params(
        args: T.untyped,
        block: T.proc
          .params(relation: ProductItem::PrivateRelation)
          .returns(ProductItem::PrivateRelation),
      ).void
    end
    def relation_scope(*args, &block); end
  end
end
