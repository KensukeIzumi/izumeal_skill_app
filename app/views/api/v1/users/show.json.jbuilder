json.data(@user) { |d| json.extract!(d, :id, :name, :added_skill_tags) }
