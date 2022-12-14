# typed: true

# DO NOT EDIT MANUALLY
# This is an autogenerated file for dynamic methods in `Types::ProductItemInputType`.
# Please instead update this file by running `bin/tapioca dsl Types::ProductItemInputType`.

class Types::ProductItemInputType
  sig { returns(T.nilable(::String)) }
  def description; end

  sig { returns(::String) }
  def name; end

  sig { returns(::String) }
  def order_scope; end

  sig { returns(T.nilable(::String)) }
  def price; end

  sig { returns(T.nilable(::Integer)) }
  def price_cents; end

  sig { returns(T.nilable(T::Array[::Types::OrderQuestionInputType])) }
  def questions; end

  sig { returns(T.untyped) }
  def tax_rate; end

  sig { returns(T.nilable(::String)) }
  def units; end
end
