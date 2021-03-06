class CardDeck
  attr_reader :cards

  RANKS = %w[A K Q J 10 9 8 7 6 5 4 3 2].freeze
  SUITS = %w[S C D H].freeze

  def initialize(cards = CardDeck.create_standard_deck)
    @cards = cards
  end

  def self.create_standard_deck
    RANKS.flat_map do |rank|
      SUITS.map do |suit|
        PlayingCard.new(rank, suit)
      end
    end
  end

  def shuffle!
    cards.shuffle!
  end

  def deal
    cards.shift
  end

  def count
    cards.count
  end

  def out_of_cards?
    cards.empty?
  end

  def as_json
    {
      cards: cards.map(&:as_json)
    }
  end

  def self.from_json(data)
    new(data['cards'].map { |card| PlayingCard.from_json(card) })
  end

  def ==(other)
    equal = true
    other.cards.each do |card2|
      equal = false if cards[other.cards.index(card2)] != card2
    end
    equal
  end
end
