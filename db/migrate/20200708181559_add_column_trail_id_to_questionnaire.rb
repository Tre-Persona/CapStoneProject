class AddColumnTrailIdToQuestionnaire < ActiveRecord::Migration[6.0]
  def change
    add_column :questionnaires, :trail_id, :integer
  end
end
