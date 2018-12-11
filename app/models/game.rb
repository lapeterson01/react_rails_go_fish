class Game < ApplicationRecord
  after_save do
    self.name = "Go Fish #{id}" if !name || name.split.empty?
  end

  has_many :game_users, dependent: :destroy
  has_many :users, -> { distinct }, through: :game_users
  belongs_to :winner, class_name: 'User', optional: true

  validates :name, uniqueness: true
  validates :number_of_players, numericality: {
    less_than_or_equal_to: 4,
    greater_than_or_equal_to: 2,
    only_integer: true
  }
  validates :host, presence: true

  def go_fish(go_fish = nil)
    @go_fish ||= go_fish || GoFish.from_json(data)
  end

  def find_player(user_id)
    go_fish.players[user_id]
  end

  def players
    data['players'].map { |player| player['name'] }
  end

  def all_players_except(user_id)
    go_fish.players.reject { |id| id == user_id }
  end

  def add_player_to_game(user)
    data ? go_fish : go_fish(GoFish.new)
    go_fish.add_player(Player.new(user))
    finalize
    users << user
  end

  def start_game
    go_fish.start
    finalize
  end

  def format_round_result(current_user)
    return unless go_fish.round_result && go_fish.round_result['cards']

    cards = go_fish.round_result['cards'].map(&:to_s)
    if go_fish.round_result['turn'].to_i == current_user
      current_user_round_result(cards)
    else
      other_users_round_result(cards, current_user)
    end
  end

  def format_book_result(current_user)
    return unless go_fish.round_result && go_fish.round_result['books']

    if go_fish.round_result['books'].to_i == current_user
      'You got a book!'
    else
      "#{go_fish.players[go_fish.round_result['books'].to_i].name} got a book!"
    end
  end

  def state_for(user)
    {
      deckCount: go_fish.deck.count,
      currentUser: find_player(user.id).as_json,
      opponents: all_players_except(user.id).values.map(&:opponent_json)
    }
  end

  private

  def finalize
    self.data = go_fish.as_json
    save
  end
end
