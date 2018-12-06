class Game < ApplicationRecord
  has_many :game_users, dependent: :destroy
  has_many :users, -> { distinct }, through: :game_users
  belongs_to :winner, class_name: 'User', optional: true

  def go_fish(go_fish = nil)
    @go_fish ||= go_fish || GoFish.from_json(data)
  end

  def players
    data['players'].map { |player| player['name'] }
  end

  def add_player_to_game(user)
    data ? go_fish : go_fish(GoFish.new)
    go_fish.add_player(Player.new(user))
    finalize
    users << user
  end

  private

  def finalize
    self.data = go_fish.as_json
    save
  end
end
