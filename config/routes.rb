Rails.application.routes.draw do
  resources :questionnaires
  resources :comments
  resources :favorites
  devise_for :users, :controllers => { :destroy => "users_controller", :show => "users_controller" }
  get 'users/comments' => 'comments#user_only_index'
  get 'users/:id' => 'users#show'
  get '/trails/:id/questionnaires' => 'questionnaires#by_id'
  get '*path', to: 'main#index', constraints: ->(request){ request.format.html? }
  root to: 'main#index'

end
