# typed: strong

class ProductItem
  sig {returns(Money)}
  def price; end

  module CommonRelationMethods
    include Discard::Model::ClassMethods
  end
end
