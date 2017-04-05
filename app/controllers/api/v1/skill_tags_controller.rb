module Api
  module V1
    class SkillTagsController < ApplicationController
      def create
        skill_tag = SkillTag.new(name: skill_tag_params[:skill_tag])
        if skill_tag.save
          user_skill_tag = UserSkillTag.new(
            user_id: skill_tag_params[:user_id],
            added_by: skill_tag_params[:added_by],
            skill_tag_id: skill_tag.id
          )
          if user_skill_tag.save
            @added_skill_tag = {
              id: skill_tag.id,
              name: skill_tag.name,
              user_skill_tags: skill_tag.user_skill_tags,
              count: skill_tag.user_skill_tags.count,
              added_by: skill_tag.users,
            }
          else
            skill_tag.destroy()
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
