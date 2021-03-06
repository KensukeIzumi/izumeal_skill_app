Rails.application.routes.draw do
  get 'sessions/new'

  root 'sessions#new'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/signup', to: 'users#new'
  post '/signup', to: 'users#create'
  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  resources :users

  namespace :api, { format: 'json' } do
    namespace :v1 do
      resources :users
      resources :skill_tags
      resources :user_skill_tags
    end
  end
end
