class SkillTag < ApplicationRecord
  validates :name, presence: true, uniqueness: true

  has_many :user_skill_tags, dependent: :destroy
  has_many :users, through: :user_skill_tags

  def get_detail_added_to(user_id)
    user = User.find(user_id)
    
    user_skill_tags = user.user_skill_tags.where(skill_tag_id: self.id)
    added_skill_tag = {
      id: self.id,
      name: self.name,
      user_skill_tags: user_skill_tags,
      count: user_skill_tags.count,
      added_by: User.where(id: user_skill_tags.pluck(:added_by))
    }

    return added_skill_tag
  end
end
