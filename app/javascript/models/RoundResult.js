class RoundResult {
  constructor(json, game) {
    this._game = game
    this._asker = json ? this.game().playerById(json.asker) : null
    this._cards = json ? json.cards : null
    this._target = json ? this.game().playerById(json.target) : null
  }

  game() {
    return this._game
  }

  asker() {
    return this._asker
  }

  target() {
    return this._target
  }

  cards() {
    return this._cards
  }

  toString() {
    if (!this.asker() || !this.cards()) return

    return `${this._askerToString()} ${this.target() ? 'took' : 'drew'} ${this._cardsToString()} from ${this.target() ? this._targetToString() : 'the deck'}`
  }

  turnMessage() {
    return `It is ${this.game().isHumanPlayer(this.game().currentPlayer().id) ? 'your' : `${this.game().currentPlayer().name}'s`} turn`
  }

  _askerToString() {
    return this.game().isHumanPlayer(this.asker().id()) ? 'You' : this.asker().name()
  }

  _targetToString() {
    return this.game().isHumanPlayer(this.target().id()) ? 'you' : this.target().name()
  }

  _cardsToString() {
    return !this.game().isHumanPlayer(this.asker().id()) && !this.target() ? 'cards' : this.cards().join(', ')
  }
}

export default RoundResult
