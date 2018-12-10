import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PlayerView from './PlayerView'

class GameView extends Component {
  static propTypes = {
    deckCount: PropTypes.number.isRequired,
    currentUser: PropTypes.object.isRequired
  }

  render() {
    return (
      <div className="game">
        <div>Opponents</div>
        <div className="table">Deck: {this.props.deckCount}</div>
        <PlayerView currentUser={this.props.currentUser} />
      </div>
    )
  }
}

export default GameView

// <form onSubmit={this.playRound.bind(this)}>
//   <OpponentListView opponents={opponents} setPlayer={this.setPlayer.bind(this)} selectedPlayer={this.state.selectedPlayer} />
//   <div className="table">Deck: {game.deck().count()}</div>
//   <PlayerView game={game} playRound={this.playRound.bind(this)} setRank={this.setRank.bind(this)} />
//   <div className="message">{game.roundResult()}</div>
//   {playRoundButton}
// </form>
