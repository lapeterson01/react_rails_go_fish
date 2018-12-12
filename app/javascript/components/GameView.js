import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Game from '../models/Game'
import OpponentListView from './OpponentListView'
import PlayerView from './PlayerView'

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
    opponents: PropTypes.array.isRequired
  }

  setPlayer(event) {
    const selectedPlayer = event.target.value
    this.setState(() => { return { selectedPlayer } })
  }

  setRank(event) {
    const selectedRank = event.target.value
    this.setState(() => { return { selectedRank } })
  }

  playRound(event) {
    event.preventDefault()
    const { selectedPlayer, selectedRank } = this.state

    // const setState = this.setState.bind(this)
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

  render() {
    return (
      <form onSubmit={this.playRound.bind(this)} className="game">
        <OpponentListView
          opponents={this.state.game.opponents()}
          setPlayer={this.setPlayer.bind(this)}
          selectedPlayer={this.state.selectedPlayer}
        />
        <div className="table">Deck: {this.state.game.deckCount()}</div>
        <PlayerView currentUser={this.state.game.currentUser()} setRank={this.setRank.bind(this)} />
      </form>
    )
  }
}

export default GameView
