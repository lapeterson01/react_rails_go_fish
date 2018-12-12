Rails.application.routes.draw do
  resources :sessions,   only: %i[index create]
  resource :session,     only: %i[destroy]
  resources :users,      only: %i[new create]
  resources :games,      only: %i[index new create show update]
  post '/set-socket-id', to: 'socket_id#socket_id'
  post '/play-round/:id',    to: 'games#play_round'
  root 'sessions#index'
end
