import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Game extends Component {
  static propTypes = {
    deckCount: PropTypes.number.isRequired
  }

  render() {
    return (
      <div>
        <div>Opponents</div>
        <div className="table">Deck: {this.props.deckCount}</div>
        <div>Player</div>
      </div>
    )
  }
}

export default Game

// <form onSubmit={this.playRound.bind(this)}>
//   <OpponentListView opponents={opponents} setPlayer={this.setPlayer.bind(this)} selectedPlayer={this.state.selectedPlayer} />
//   <div className="table">Deck: {game.deck().count()}</div>
//   <PlayerView game={game} playRound={this.playRound.bind(this)} setRank={this.setRank.bind(this)} />
//   <div className="message">{game.roundResult()}</div>
//   {playRoundButton}
// </form>
