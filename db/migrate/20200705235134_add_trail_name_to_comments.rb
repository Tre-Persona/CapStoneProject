class AddTrailNameToComments < ActiveRecord::Migration[6.0]
  def change
    add_column :comments, :trail_name, :string
  end
end
