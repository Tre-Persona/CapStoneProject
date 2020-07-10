class QuestionnairesController < ApplicationController
        before_action :authenticate_user!, only: [:create, :edit, :update, :destroy]
    
        def index
            questions = Questionnaire.all
            render json: questions
        end
    
        def user_only_index
            questions = current_user.questionnaires.all
            render json: questions
        end
    
        def show
            question = Quesitonnaire.find(params[:id])
            render json: question
        end
    
        def by_id
            questions = Questionnaire.where(params[:trail_id])
            render json: questions
        end
        
        def new
        end
    
        def edit
            question = current_user.questionnaires.find(params[:id])
            render json: question
        end
    
        def update
            question = current_user.questionnaires.find(params[:id])
            question.update(questionnaire_params)
            if question.valid?
              render json: question
            else
              render json: question.errors, status: 422
            end
        end
    
        def create
            question = current_user.questionnaires.create(questionnaire_params)
            if question.valid?
              render json: question
            else
              render json: question.errors, status:422
            end
        end
    
        def destroy
            question = current_user.questionnaires.find(params[:id])
            if question.destroy
              render json: question
            else
              render json: question.errors, status:422
            end
        end
    
    private
        def questionnaire_params
            params.require(:questionnaire).permit(:trail_id, :trail_name, :question1, :question2, :question3, :question4, :question5, :question6, :question7, :question8, :question9, :question10, :question11, :question12, :question13, :question14, :question15, :question16, :question17, :question18, :question19)
        end
end
