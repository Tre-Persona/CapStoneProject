class ChangeUpdatedatDataTypeToDatetimeInComments < ActiveRecord::Migration[6.0]
  def change
    change_column :comments, :updated_at, :datetime
  end
end
