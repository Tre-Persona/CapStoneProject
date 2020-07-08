class QuestionnairesController < ApplicationController
    before_action :authenticate_user!, only: [:create, :edit, :update]

    def index
        questions = Questionnaire.all
        render json: questions
    end

    def by_id
        questionnaires = Questionnaire.where(trail_id: id)
        render json: questionnaires
    end

private
    def questionnaire_params
        params.require(:id).permit (:trail_id)
    end
end

