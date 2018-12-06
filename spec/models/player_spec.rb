require 'rails_helper'

RSpec.describe Player, type: :model do
  let(:user) do
    User.new name: 'Player', username: 'player', password: 'password',
             password_confirmation: 'password'
  end
  let(:player) do
    user.save
    Player.new(user)
  end
  let(:card1) { PlayingCard.new('A', 'Spades') }

  describe '#initialize' do
    it 'begins with given name and an empty hand and books count set to 0' do
      expect(player.name).to eq 'Player'
      expect(player.hand_count && player.books.length).to eq 0
    end
  end

  describe '#retrieve_card' do
    it 'takes in a card and adds it to player hand' do
      player.retrieve_card(card1)
      expect(player.hand_count).to eq 1
      expect(player.hand['A']).to eq [card1]
    end
  end

  describe '#give_up_cards' do
    it 'removes all cards of specified rank from player hand and returns it' do
      cards = [card2 = PlayingCard.new('A', 'Clubs'), PlayingCard.new('Q', 'Hearts')]
      cards.push(card1)
      cards.each { |card| player.retrieve_card(card) }
      expect(player.give_up_cards(card1.rank)).to eq [card2, card1]
      expect(player.hand_count).to eq 1
    end
  end

  describe '#out_of_cards?' do
    it 'returns true if player hand is empty' do
      expect(player.out_of_cards?).to eq true
      player.retrieve_card(card1)
      expect(player.out_of_cards?).to eq false
    end
  end

  describe 'equality' do
    let(:user2) do
      User.new name: 'Player 2', username: 'player2', password: 'password',
               password_confirmation: 'password'
    end
    let(:player2) do
      user2.save
      Player.new(user2)
    end

    it 'returns true if names are equal' do
      duplicate_player = player.dup
      expect(player).to eq duplicate_player
      expect(player).to_not eq player2
    end
  end

  describe 'json methods' do
    it 'allows player to be converted to json object' do
      player_hand = player.hand.values.flat_map(&:as_json)
      json_player = { id: player.id, name: player.name, hand: player_hand, books: player.books }
      expect(player.as_json).to eq json_player
    end

    it 'allows player json object to be converted to class instance' do
      expect(Player.from_json(player.as_json.stringify_keys)).to eq player
    end
  end
end
