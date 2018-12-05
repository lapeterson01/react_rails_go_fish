Rails.application.routes.draw do
  resources :sessions, only: %i[index create]
  resources :users,    only: %i[new create]
  resources :games,    only: %i[index]
  root 'sessions#index'
end
