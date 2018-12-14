import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Game from '../models/Game'
import OpponentListView from './OpponentListView'
import PlayerView from './PlayerView'
import RoundResultView from './RoundResultView'

class GameView extends Component {
  constructor(props) {
    super(props)

    const game = new Game(this.props)
    this.state = { game }

    Pusher.logToConsole = true;

    var pusher = new Pusher('5f61327f553a6b436418', {
      cluster: 'us2',
      forceTLS: true
    });

    var channel = pusher.subscribe('go-fish');
    const fetchGame = this._fetchGame.bind(this)
    channel.bind("game-refresh", function(data) {
      if(window.location.pathname == `/games/${data.id}`) {
        fetchGame()
      }
    })
  }

  static propTypes = {
    id: PropTypes.number.isRequired,
    deckCount: PropTypes.number.isRequired,
    currentUser: PropTypes.object.isRequired,
    currentPlayer: PropTypes.object.isRequired,
    opponents: PropTypes.array.isRequired,
    winner: PropTypes.object,
    roundResult: PropTypes.object
  }

  setPlayer(event) {
    const selectedPlayer = event.target.value
    this.setState({ selectedPlayer }, () => {
      this._playRoundIfPossible()
    })
  }

  setRank(event) {
    const selectedRank = event.target.value
    this.setState({ selectedRank }, () => {
      this._playRoundIfPossible()
    })
  }

  _isCurrentPlayer() {
    return this.state.game.currentUser().id() === this.state.game.currentPlayer().id
  }

  _fetchGame() {
    fetch(`/games/${this.state.game.id()}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(
        (result) => {
          const game = new Game(result)
          this.setState(() => { return { game } })
        },
        (error) => {
          console.log(error)
        }
      )
  }

  _playRoundIfPossible() {
    if (!this.state.selectedPlayer || !this.state.selectedRank) return

    const { selectedPlayer, selectedRank } = this.state

    fetch(`/play-round/${this.state.game.id()}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ selectedPlayer, selectedRank })
    })
      .then(res => res.json())
      .then(
        (result) => {
          const game = new Game(result)
          this.setState(() => { return { game, selectedPlayer: null, selectedRank: null } })
        },
        (error) => {
          console.log(error)
        }
      )
  }

  render() {
    if (this.state.game.winner()) {
      return (
        <div className="game">
          <div className="game-over--title">
            <h2>Game Over!</h2>
          </div>
          <div className="game-over--message">
            <h4>Winner {this.state.game.winner().name}</h4>
          </div>
        </div>
      )
    }

    return (
      <div className="game">
        <OpponentListView
          opponents={this.state.game.opponents()}
          isCurrentPlayer={this._isCurrentPlayer()}
          setPlayer={this.setPlayer.bind(this)}
          selectedPlayer={this.state.selectedPlayer}
        />
        <div className="table">Deck: {this.state.game.deckCount()}</div>
        <PlayerView
          currentUser={this.state.game.currentUser()}
          isCurrentPlayer={this._isCurrentPlayer()}
          setRank={this.setRank.bind(this)}
          selectedRank={this.state.selectedRank}
        />
        <RoundResultView roundResult={this.state.game.roundResult().toString()} />
        <div>It is {this.state.game.currentPlayer().name}'s turn</div>
      </div>
    )
  }
}

export default GameView
