class PlayingCard {
  static fromJson(jsonCard) {
    let rank, suit
    ({ rank, suit } = jsonCard)
    return new this(rank, suit)
  }

  constructor(rank, suit) {
    this._rank = rank
    this._suit = suit
  }

  rank() {
    return this._rank
  }

  suit() {
    return this._suit
  }

  toString() {
    return `${this.suit().toLowerCase()}${this.rank().toLowerCase()}`
  }
}

export default PlayingCard
