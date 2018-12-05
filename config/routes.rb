Rails.application.routes.draw do
  resources :sessions, only: %i[index]
  root 'sessions#index'
end
