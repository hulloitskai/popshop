# typed: strong

module FriendlyId::Concern
  include FriendlyId::Model
  include FriendlyId::Reserved
  include FriendlyId::Slugged
end
