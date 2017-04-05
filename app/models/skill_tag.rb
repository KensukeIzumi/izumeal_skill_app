class SkillTag < ApplicationRecord
  validates :name, presence: true, uniqueness: true

  has_many :user_skill_tags, dependent: :destroy
  has_many :users, through: :user_skill_tags
end
