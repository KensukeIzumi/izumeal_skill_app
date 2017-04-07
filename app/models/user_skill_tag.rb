class UserSkillTag < ApplicationRecord
  belongs_to :user
  belongs_to :skill_tag

  validates :user_id, uniqueness: { scope: [:skill_tag_id, :added_by] }
end
