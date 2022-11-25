# typed: strict
# frozen_string_literal: true

# == Schema Information
#
# Table name: accounts
#
#  id         :uuid             not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  owner_id   :uuid             not null
#
# Indexes
#
#  index_accounts_on_owner_id  (owner_id)
#
# Foreign Keys
#
#  fk_rails_...  (owner_id => users.id)
#

class Account < ApplicationRecord
  # == Associations ==
  belongs_to :owner, class_name: "User"
end
