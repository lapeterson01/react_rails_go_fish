class GamesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: %i[create play_round]
  skip_before_action :clear_session_if_quit,
                     only: %i[show play_view update play_round]

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
    @game = Game.find(params['id'])
    @current_user = current_user
    return game_over_view(@game) if @game.winner

    respond_to do |format|
      format.html
      format.json { render json: @game.state_for(@current_user) }
    end
    # render :show, locals: show_locals(game)
  end

  def update
    game = Game.find(session[:current_game])
    game.start_game
    game_refresh(game.id)
    redirect_to game, notice: 'Game Started'
  end

  # def play_view(game)
  #   respond_to do |format|
  #     format.html { render html: :play { game: game, current_user: current_user } }
  #     format.json { render json: game.state_for(current_user) }
  #   end
  # end

  def play_round
    game = Game.find(params['id'])
    unless params['selectedPlayer'] && params['selectedRank']
      return redirect_to game, notice: 'You must choose a player/card'
    end

    game.play_round(params['selectedPlayer'], params['selectedRank'])
    respond_to do |format|
      format.html { redirect_to game }
      format.json { render json: game.state_for(current_user) }
    end
    game_refresh(game.id)
  end

  private

  def game_params
    return { 'id' => params['id'] } if params['id']

    args = params.require(:game).permit(:name, :number_of_players).to_h
    args['host'] = current_user.id
    args
  end

  def refresh(id)
    Pusher.trigger('go-fish', "refresh", { id: id }, socket_id: session[:socket_id])
  end

  def game_refresh(id)
    Pusher.trigger('go-fish', 'game-refresh', { id: id }, socket_id: session[:socket_id])
  end
end
