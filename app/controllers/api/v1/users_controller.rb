module Api
  module V1
    class UsersController < ApplicationController
      def show
        user = User.find(params[:id])
        added_skill_tags = user.skill_tags.uniq{|skill| skill.name}.map do |skill_tag|
          user_skill_tags = user.user_skill_tags.where(skill_tag_id: skill_tag.id)
          {
            id: skill_tag.id,
            name: skill_tag.name,
            user_skill_tags: user_skill_tags,
            count: user_skill_tags.count,
            added_by: skill_tag.users,
          }
        end
        @user = {
          id: user.id,
          name: user.name,
          added_skill_tags: added_skill_tags,
        }
        render json: @user
      end
    end
  end
end
