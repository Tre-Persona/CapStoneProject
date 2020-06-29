Rails.application.routes.draw do
  resources :comments
  resources :favorites
  devise_for :users
  get '*path', to: 'main#index', constraints: ->(request){ request.format.html? }
  root to: 'main#index'
end
