module Api
  module V1
    class SkillTagsController < ApplicationController
      def create
        user_id = skill_tag_params[:user_id]
        added_by = skill_tag_params[:added_by]
        skill_tag_name = skill_tag_params[:skill_tag]

        skill_tag = SkillTag.find_by(name: skill_tag_name)

        if skill_tag.nil?
          skill_tag = SkillTag.new(name: skill_tag_name)
          if skill_tag.save
            user_skill_tag = UserSkillTag.new(
              user_id: user_id,
              added_by: added_by,
              skill_tag_id: skill_tag.id
            )
            if user_skill_tag.save
              @added_skill_tag = skill_tag.get_detail_added_to(user_id)
            else
              skill_tag.destroy()
            end
          end
        else   
          user_skill_tag = UserSkillTag.new(skill_tag_id: skill_tag.id, user_id: user_id, added_by: added_by)
          if user_skill_tag.save
            @added_skill_tag = skill_tag.get_detail_added_to(user_id)
          end
        end

        render json: @added_skill_tag
      end

      private

      def skill_tag_params
        params.permit(:skill_tag, :user_id, :added_by, :format)
      end
    end
  end
end
