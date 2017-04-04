class User < ApplicationRecord
  validates(:name, presence: true)
  validates :email, presence: true, length: { maximum: 255 }, uniqueness: true
  validates :password, presence: true, length: { minimum: 6 }

  has_many :user_skill_tags, foreign_key: 'user_id', dependent: :destroy
#  has_many :user_skill_tags, foreign_key: 'added_by', dependent: :destroy
  has_many :skill_tags, through: :user_skill_tags
  has_secure_password
end
