class CommentsController < ApplicationController
  before_action :authenticate_user!, only: [:create, :edit, :update, :destroy]

  def index
    comments = Comment.all
    render json: comments
  end

  def show
    comment = Comment.all
    render json: comment
  end

  def edit
    comment = current_user.comments.find(params[:id])
    render json: comment
  end

  def update
    comment = current_user.comments.find(params[:id])
    comment.update(comment_params)
    if comment.valid?
      render json: comment
    else
      render json: comment.errors, status: 422
    end
  end

  def create
    comment = current_user.comments.create(comment_params)
    if comment.valid?
      render json: comment
    else
      render json: comment.errors, status:422
    end
  end

  def destroy
    comment = current_user.comments.find(params[:id])
    if comment.destroy
      render json: comment
    else
      render json: comment.errors, status:422
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:post, :trail_id, :user_name)
  end
end
