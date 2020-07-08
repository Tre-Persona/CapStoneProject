class ChangeColumnTrailIdValueFromIntegerToString < ActiveRecord::Migration[6.0]
  def change
    change_column :questionnaires, :trail_id, :string
  end
end
