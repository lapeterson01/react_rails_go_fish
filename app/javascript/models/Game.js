import Player from './Player'
import Opponent from './Opponent'

class Game {
  constructor(json) {
    this._id = json.id
    this._deckCount = json.deckCount
    this._currentUser = new Player(json.currentUser)
    this._opponents = json.opponents.map((opp) => new Opponent(opp))
  }

  id() {
    return this._id
  }

  deckCount() {
    return this._deckCount
  }

  currentUser() {
    return this._currentUser
  }

  opponents() {
    return this._opponents
  }
}

export default Game
