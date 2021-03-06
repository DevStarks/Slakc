# == Schema Information
#
# Table name: users
#
#  id                 :integer          not null, primary key
#  username           :string           not null
#  first_name         :string           not null
#  last_name          :string           not null
#  picture_url        :string
#  password_digest    :string           not null
#  session_token      :string           not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  image_file_name    :string
#  image_content_type :string
#  image_file_size    :integer
#  image_updated_at   :datetime
#

class User < ActiveRecord::Base
  validates :username, :first_name, :last_name, :session_token, :password_digest, presence: true
  validates :username, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  has_attached_file :image,
    default_url: "avatar1.png"

  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/

  after_initialize :ensure_session_token

  has_many :messages, class_name: :Message, foreign_key: :author_id, dependent: :destroy
  has_many :channel_memberships, dependent: :destroy
  has_many :channels, through: :channel_memberships

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return user if user && user.is_password?(password)
    nil
  end

  attr_reader :password

  def direct_messages
    self.channels.where(direct_message: true)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def ensure_session_token
    self.session_token ||= generate_session_token
  end

  def generate_session_token
    SecureRandom::urlsafe_base64(16)
  end

  def reset_session_token!
    self.session_token = generate_session_token
    self.save!
    self.session_token
  end
end
