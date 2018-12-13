require 'rails_helper'

RSpec.describe Game, type: :model do
  let(:go_fish) { GoFish.new }
  let(:test_user1) { User.new name: 'Test User 1', username: 'test_user1', password: 'password', password_confirmation: 'password' }
  let(:test_user2) { User.new name: 'Test User 2', username: 'test_user2', password: 'password', password_confirmation: 'password' }
  let(:test_game) do
    test_user1.save && test_user2.save
    [Player.new(test_user1), Player.new(test_user2)].each { |player| go_fish.add_player(player) }
    go_fish.start
    Game.new(name: 'test_game', number_of_players: 2, data: go_fish.as_json, host: 1)
  end

  it 'should be valid' do
    expect(test_game).to be_valid
  end

  describe 'name' do
    it 'should return a default name if name is left empty' do
      test_game.name = ' '
      test_game.save
      expect(test_game.name).to eq "Go Fish #{test_game.id}"
      test_game2 = Game.new(number_of_players: 2, data: go_fish.start.as_json, host: 2)
      test_game2.save
      expect(test_game2.name).to eq "Go Fish #{test_game2.id}"
    end

    it 'must be unique' do
      duplicate_test_game = test_game.dup
      test_game.save
      expect(duplicate_test_game).to_not be_valid
    end
  end

  describe 'number_of_players' do
    it 'should only allow a max number of players' do
      test_game.number_of_players = 5
      expect(test_game).to_not be_valid
    end

    it 'should only allow a min number of players' do
      test_game.number_of_players = 1
      expect(test_game).to_not be_valid
    end
  end

  describe 'host' do
    it 'should be present' do
      test_game.host = nil
      expect(test_game).to_not be_valid
    end
  end

  describe 'all_players_except' do
    it 'returns all players except for the player with the id provided' do
      selected_players = test_game.go_fish.players.select { |id, player| id != test_user1.id }
      expect(test_game.all_players_except(test_user1.id)).to eq selected_players
    end
  end

  describe 'state_for' do
    def opponents_arr(user)
      test_game.all_players_except(user.id).values.map do |opponent|
        {
          id: opponent.id,
          name: opponent.name,
          handCount: opponent.hand_count,
          books: opponent.books_count
        }
      end
    end

    it 'returns a json version of the game specific to the current user' do
      test_game.save
      game_hash = test_game.state_for(test_user1)
      expect(game_hash[:id]).to eq (test_game.id)
      expect(game_hash[:deckCount]).to eq (38)
      expect(Player.from_json(game_hash[:currentUser].stringify_keys)).to eq (Player.new(test_user1))
      expect(game_hash[:currentPlayer]).to eq ( { id: test_user1.id, name: test_user1.name })
      expect(game_hash[:opponents]).to eq opponents_arr(test_user1)
    end
  end
end
