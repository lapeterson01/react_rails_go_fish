class GamesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: %i[create]
  skip_before_action :clear_session_if_quit,
                     only: %i[show play_view update select_card select_player play_round]

  def index
    render :index, locals: { games: Game.all }
  end

  def new
    @game = Game.new
  end

  def create
    game = Game.find_or_initialize_by game_params
    game.add_player_to_game(current_user)
    message = game.id ? 'Successfully created game' : 'Game creation unsuccessful'
    refresh(game.id)
    return redirect_to games_path, notice: message if game.host == current_user.id

    redirect_to game, notice: 'Successfully joined'
  end

  def show
    session[:current_game] = params['id']
    game = Game.find(params['id'])
    return game_over_view(game) if game.winner

    return play_view(game) if game.data['started']

    render :show, locals: show_locals(game)
  end

  def update
    game = Game.find(session[:current_game])
    game.start_game
    game_refresh(game.id)
    redirect_to game, notice: 'Game Started'
  end

  def play_view(game)
    render :play, locals: {
      game: game,
      current_user: current_user
    }
  end

  private

  def game_params
    return { 'id' => params['id'] } if params['id']

    args = params.require(:game).permit(:name, :number_of_players).to_h
    args['host'] = current_user.id
    args
  end

  def show_locals(game)
    {
      players: game.players,
      current_player: User.find(session[:current_user]),
      id: game.id,
      host: game.host,
      started: game.data['started']
    }
  end

  def refresh(id)
    Pusher.trigger('go-fish', "refresh", { id: id }, socket_id: session[:socket_id])
  end

  def game_refresh(id)
    Pusher.trigger('go-fish', 'game-refresh', { id: id }, socket_id: session[:socket_id])
  end
end
