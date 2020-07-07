class AddUserNameAndTrailNameToComments < ActiveRecord::Migration[6.0]
  def change
    add_column :comments, :user_name, :string
    add_column :comments, :trail_name, :string
  end
end
