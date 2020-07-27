class ApplicationMailer < ActionMailer::Base
  default from: 'trepersona@gmail.com'
  layout 'mailer'
  
  def new_user_email
    @user = params[:user]
    mail(to: @user.email, subject: 'Welcome to  Happy Trails!')
  end

  def update_user_email
    @user = params[:user]
    mail(to: @user.email, subject: 'Account has been updated!')
  end


  def welcome_email
    @user = params[:user]
    @url  = 'http://example.com/login'
    mail(to: @user.email, subject: 'Welcome to My Awesome Site')
  end
  
end
