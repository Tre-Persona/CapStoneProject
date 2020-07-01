class AddTrailIdToComments < ActiveRecord::Migration[6.0]
  def change
    add_column :comments, :trail_id, :integer
  end
end
