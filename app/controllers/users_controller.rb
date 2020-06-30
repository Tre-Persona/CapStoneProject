class UsersController < ApplicationController
  before_action :authenticate_user!

  def index
    users = User.all
    render json: users
  end

  def destroy
    user = User.find(current_user.id)
    if user.destroy
      redirect_to :root
    else
      render json: user.errors, status: 422
    end
  end


  def show
    user = User.find(current_user.id)
    render json: user
  end
end
