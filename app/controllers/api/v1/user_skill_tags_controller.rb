module Api
  module V1
    class UserSkillTagsController < ApplicationController
      def create 
        params = user_skill_tag_params
        params.delete(:format)
        user_skill_tag = UserSkillTag.new(params)

        if user_skill_tag.save
          skill_tag = SkillTag.find(user_skill_tag_params[:skill_tag_id])
          @added_skill_tag = skill_tag.get_detail_added_to(user_skill_tag_params[:user_id])
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
