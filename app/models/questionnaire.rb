class Questionnaire < ApplicationRecord
    belongs_to :user
    validates :trail_id, :trail_name, presence: true
end
