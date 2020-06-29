Rails.application.routes.draw do
  resources :comments
  resources :favorites
  devise_for :users
  
end
