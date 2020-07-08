class QuestionnairesController < ApplicationController
    before_action :authenticate_user!

    def index
        questions = Questionnaire.all
        render json: questions
    end

    def by_id
        questionnaires = Questionnaire.where(params[:trail_id])
        render json: questionnaires
    end

    def create
        questionnaire = Questionnaire.create(questionnaire_params)
        if questionnaire.valid?
          render json: questionnaire
        else
          render json: questionnaire.errors, status:422
        end
    end

private
    def questionnaire_params
        puts params
        params.permit(:newForm, :questionnaire, :trail_id, :question1, :question2, :question3, :question4, :question5, :question6, :question7, :question8, :question9, :question10, :question11, :question12, :question13, :question14, :question15, :question16, :question17, :question18)
    end
end

