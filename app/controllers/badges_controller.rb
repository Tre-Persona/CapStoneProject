class BadgesController < ApplicationController
  before_action :authenticate_user!

  def index
    badges = current_user.badges.all
    render json: badges
  end

  def create
    badge = current_user.badges.create(badge_params)
    if badge.valid?
      render json: badge
    else
      render json: badge.errors, status:422
    end
  end

  def destroy
    badge = current_user.badges.find(params[:id])
    if badge.destroy
      render json: badge
    else
      render json: badge.errors, status:422
    end
  end

  private
  def badge_params
    params.require(:badge).permit(:level)
  end
end