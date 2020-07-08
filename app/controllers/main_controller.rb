class MainController < ApplicationController
  def index
    if user_signed_in?
      @user = User.find(current_user.id)
      @avatar = @user.avatar
    else
      @user = { id:0, user_name:"", email:""}
    end
  end
end
