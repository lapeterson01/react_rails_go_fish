import Player from './Player'
import Opponent from './Opponent'
import RoundResult from './RoundResult'

class Game {
  constructor(json) {
    this._id = json.id
    this._deckCount = json.deckCount
    this._currentUser = new Player(json.currentUser)
    this._currentPlayer = json.currentPlayer
    this._opponents = json.opponents.map((opp) => new Opponent(opp))
    this._winner = json.winner
    this._roundResult = new RoundResult(json.roundResult, this)
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

  currentPlayer() {
    return this._currentPlayer
  }

  opponents() {
    return this._opponents
  }

  winner() {
    return this._winner
  }

  roundResult() {
    return this._roundResult
  }

  allPlayers() {
    return this.opponents().concat(this.currentUser())
  }

  playerById(id) {
    return this.allPlayers().find((player) => {
      return player.id() === id
    })
  }

  isHumanPlayer(id) {
    return id === this.currentUser().id()
  }
}

export default Game
