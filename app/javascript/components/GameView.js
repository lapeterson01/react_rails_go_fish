import React, { Component } from 'react'
import PropTypes from 'prop-types'
import OpponentListView from './OpponentListView'
import PlayerView from './PlayerView'

class GameView extends Component {
  static propTypes = {
    deckCount: PropTypes.number.isRequired,
    currentUser: PropTypes.object.isRequired,
    opponents: PropTypes.object.isRequired
  }

  setPlayer(event) {
    console.log(event.target.value)
  }

  setRank(event) {
    console.log(event.target.value)
  }

  render() {
    return (
      <div className="game">
        <OpponentListView opponents={this.props.opponents} setPlayer={this.setPlayer.bind(this)} />
        <div className="table">Deck: {this.props.deckCount}</div>
        <PlayerView currentUser={this.props.currentUser} setRank={this.setRank.bind(this)} />
      </div>
    )
  }
}

export default GameView
