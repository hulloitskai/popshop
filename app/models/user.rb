# typed: strict
# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id                     :uuid             not null, primary key
#  confirmation_sent_at   :datetime
#  confirmation_token     :string
#  confirmed_at           :datetime
#  current_sign_in_at     :datetime
#  current_sign_in_ip     :string
#  email                  :string           not null
#  encrypted_password     :string           not null
#  last_sign_in_at        :datetime
#  last_sign_in_ip        :string
#  name                   :string           not null
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string
#  sign_in_count          :integer          default(0), not null
#  unconfirmed_email      :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  primary_account_id     :uuid
#
# Indexes
#
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_primary_account_id    (primary_account_id)
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (primary_account_id => accounts.id)
#

class User < ApplicationRecord
  # == Concerns
  include Identifiable
  include ::Named

  # == Associations
  has_many :accounts,
           inverse_of: :owner,
           foreign_key: :owner_id,
           dependent: :destroy
  belongs_to :primary_account, class_name: "Account", optional: true

  has_many :products, through: :accounts
  has_many :orders, through: :accounts

  sig { returns(Account) }
  def primary_account!
    self.primary_account ||= accounts.first!.tap do |account|
      account = T.let(account, Account)
      update_column("primary_account_id", account.id) # rubocop:disable Rails/SkipsModelValidations
    end
  end

  # == Validations
  validates :name, presence: true, length: { maximum: 64 }
  validates :email,
            presence: true,
            length: {
              maximum: 100,
            },
            email: true,
            uniqueness: {
              case_sensitive: false,
            }
  validates :accounts, presence: true

  # == Callbacks
  before_save :set_primary_account, unless: :primary_account?

  # == Initialization
  after_initialize do
    T.bind(self, User)
    if accounts.empty?
      accounts.build(name: name)
    end
  end

  # == Methods: Admin
  sig { returns(T::Boolean) }
  def admin?
    false
  end

  # == Methods: Honeybadger
  sig { returns(T::Hash[String, T.untyped]) }
  def honeybadger_context
    { "user_id" => id, "user_email" => email }
  end

  # == Methods: FullStory
  sig { returns(T::Hash[String, T.untyped]) }
  def fullstory_identity
    { "uid" => id, "email" => email, "displayName" => name }
  end

  # == Methods
  sig { returns(T::Boolean) }
  def primary_account? = primary_account_id?

  private

  # == Helpers
  sig { void }
  def set_primary_account
    self.primary_account = accounts.first!
  end
end

# == Devise
class User
  # Others modules are: :lockable, :timeoutable, and :omniauthable.
  devise :database_authenticatable,
         :registerable,
         :recoverable,
         :rememberable,
         :validatable,
         :confirmable,
         :trackable,
         #  :omniauthable,
         reconfirmable: true

  # == Configuration
  self.filter_attributes += %i[
    encrypted_password
    reset_password_token
    confirmation_token
    invitation_token
  ]

  # rubocop:disable Layout/LineLength
  # == OmniAuth
  # sig { params(auth: OmniAuth::AuthHash).returns(User) }
  # def self.from_omniauth(auth)
  #   User.new
  #   info = T.let(auth[:info], OmniAuth::AuthHash::InfoHash)
  #   user =
  #     scoped do
  #       u =
  #         User
  #           .where(omniauth_provider: auth[:provider], omniauth_uid: auth[:uid])
  #           .or(User.where(email: info[:email]))
  #           .first
  #       T.let(u, T.nilable(User))
  #     end
  #   if user.nil?
  #     user =
  #       User.new(
  #         omniauth_provider: auth[:provider],
  #         omniauth_uid: auth[:uid],
  #         **info.slice(:first_name, :last_name, :email),
  #       )
  #     (info[:image] || info[:picture]).try! do |url|
  #       Addressable::URI
  #         .parse(url)
  #         .path
  #         .try! do |path|
  #           path = T.let(path, String)
  #           user.avatar.attach(
  #             io: File.open(url),
  #             filename: File.basename(path),
  #           )
  #         end
  #     end
  #     user.password = Devise.friendly_token
  #     user.skip_confirmation!
  #     user.save!
  #   elsif !user.omniauth_provider?
  #     user.update!(
  #   omniauth_provider: auth[:provider], omniauth_uid: auth[:uid])
  #   end
  #   user
  # end
  # rubocop:enable Layout/LineLength
end
