Rails.application.routes.draw do
  resources :comments
  resources :favorites
  devise_for :users, :controllers => { :destroy => "users_controller", :show => "users_controller" }
  get 'users/:id' => 'users#show'
  get '*path', to: 'main#index', constraints: ->(request){ request.format.html? }
  root to: 'main#index'

end
