module Api
  module V1
    class UserSkillTagsController < ApplicationController
      def create 
        params = user_skill_tag_params
        params.delete(:format)
        user_skill_tag = UserSkillTag.new(params)

        if user_skill_tag.save
          skill_tag = SkillTag.find(user_skill_tag_params[:skill_tag_id])
          user = User.find(user_skill_tag_params[:user_id])
          user_skill_tags = user.user_skill_tags.where(skill_tag_id: skill_tag.id)
          @added_skill_tag = {
            id: skill_tag.id,
            name: skill_tag.name,
            user_skill_tags: user_skill_tags,
            count: user_skill_tags.count,
            added_by: User.where(id: user_skill_tags.pluck(:added_by))
          }
        end

        render json: @added_skill_tag
      end

      private
       
      def user_skill_tag_params
        params.permit(:skill_tag_id, :user_id, :added_by, :format)
      end
    end
  end
end
