class CreateQuestionnaires < ActiveRecord::Migration[6.0]
  def change
    create_table :questionnaires do |t|
      t.integer :user_id
      t.string :trail_name
      t.integer :trail_id
      t.string :question1
      t.string :question2
      t.string :question3
      t.string :question4
      t.string :question5
      t.string :question6
      t.string :question7
      t.string :question8
      t.string :question9
      t.string :question10
      t.string :question11
      t.string :question12
      t.string :question13
      t.string :question14
      t.string :question15
      t.string :question16
      t.string :question17
      t.string :question18
      t.string :question19

      t.timestamps
    end
  end
end
