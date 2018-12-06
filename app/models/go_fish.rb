class GoFish
  attr_reader :deck, :players, :turn, :started, :round_result

  def initialize(deck = CardDeck.new, players = {}, turn = nil, round_result = nil, started = false)
    @deck = deck
    @players = players
    @turn = turn
    @round_result = round_result
    @started = started
  end

  def add_player(player)
    players[player.id] = player
    @turn = player.id if players.length == 1
  end

  def as_json
    round_result[:cards] = round_result[:cards].map(&:as_json) if round_result
    {
      deck: deck.as_json,
      players: players.values.map(&:as_json),
      turn: turn,
      round_result: round_result,
      started: started
    }
  end
end
