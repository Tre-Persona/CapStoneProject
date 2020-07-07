class CreateQuestionnaires < ActiveRecord::Migration[6.0]
  def change
    create_table :questionnaires do |t|
      t.boolean :question1
      t.boolean :question2
      t.boolean :question3
      t.boolean :question4
      t.boolean :question5
      t.boolean :question6
      t.boolean :question7
      t.boolean :question8
      t.boolean :question9
      t.boolean :question10
      t.boolean :question11
      t.boolean :question12
      t.boolean :question13
      t.boolean :question14
      t.boolean :question15
      t.boolean :question16
      t.boolean :question17
      t.boolean :question18

      t.timestamps
    end
  end
end
