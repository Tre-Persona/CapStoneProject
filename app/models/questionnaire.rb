class Questionnaire < ApplicationRecord
    belongs_to :user
    validates  :trail_id, , :user_id, :trail_name, :question1, :question2, :question3, :question4, :question5, :question6, :question7, :question8, :question9, :question10, :question11, :question12, :question13, :question14, :question15, :question16, :question17, :question18, :question19 presence: true
end
