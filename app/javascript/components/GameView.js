import React, { Component } from 'react'
import PropTypes from 'prop-types'
import OpponentListView from './OpponentListView'
import PlayerView from './PlayerView'

class GameView extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static propTypes = {
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

  render() {
    return (
      <div className="game">
        <OpponentListView opponents={this.props.opponents} setPlayer={this.setPlayer.bind(this)} selectedPlayer={this.state.selectedPlayer} />
        <div className="table">Deck: {this.props.deckCount}</div>
        <PlayerView currentUser={this.props.currentUser} setRank={this.setRank.bind(this)} />
      </div>
    )
  }
}

export default GameView
