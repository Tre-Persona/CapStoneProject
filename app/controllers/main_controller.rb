class MainController < ApplicationController
  def index
    if user_signed_in?
      @user = User.find(current_user.id)
    else
      @user = { id:0, user_name:"", email:"", avatar: {url:""}}
    end
  end
end
