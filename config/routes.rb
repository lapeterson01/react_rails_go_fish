Rails.application.routes.draw do
  resources :sessions,   only: %i[index create]
  resource :session,     only: %i[destroy]
  resources :users,      only: %i[new create]
  resources :games,      only: %i[index new create show update]
  post '/set-socket-id', to: 'socket_id#socket_id'
  root 'sessions#index'
end
