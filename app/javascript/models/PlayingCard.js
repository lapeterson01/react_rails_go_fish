class PlayingCard {
  constructor(json) {
    this._rank = json.rank
    this._suit = json.suit
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
