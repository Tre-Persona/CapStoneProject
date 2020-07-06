class CreateBadges < ActiveRecord::Migration[6.0]
  def change
    create_table :badges do |t|
      t.string :level
      t.integer :user_id

      t.timestamps
    end
  end
end
