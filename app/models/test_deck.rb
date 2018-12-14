class TestDeck < CardDeck
  attr_reader :cards

  RANKS = %w[A K Q J].freeze
  SUITS = %w[S C D H].freeze

  def initialize(cards = TestDeck.create_test_deck)
    @cards = cards
  end

  def self.create_test_deck
    RANKS.flat_map do |rank|
      SUITS.map do |suit|
        PlayingCard.new(rank, suit)
      end
    end
  end

  def shuffle!
    # do nothing
  end
end
