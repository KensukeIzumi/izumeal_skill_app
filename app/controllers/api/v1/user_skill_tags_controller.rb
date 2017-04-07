module Api
  module V1
    class UserSkillTagsController < ApplicationController
      def create 
=begin
        user_id = user_skilll_params[:user_id]
        user_skill_tag = UseSkillTag.new(user_skill_tag_params)

        if user_skill_tag.save
          @added_skill_tag = {
          
          }
        end
=end
      end

      private
       
      def user_skill_tag_params
        params.permit(:skill_tag_id, :user_id, :added_by, :format)
      end
    end
  end
end
