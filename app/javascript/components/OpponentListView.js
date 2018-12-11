import React, { Component } from 'react'
import PropTypes from 'prop-types'

class OpponentListView extends Component {
  static propTypes = {
    opponents: PropTypes.array.isRequired,
    setPlayer: PropTypes.func.isRequired,
    selectedPlayer: PropTypes.string
  }

  render() {
    const selectedPlayer = this.props.selectedPlayer
    return this.props.opponents.map((opponent) => {
      console.log(selectedPlayer === opponent.name)
      return (
        <label key={opponent.id} className="game-list-item" onClick={this.props.setPlayer}>
          <input type="radio" value={opponent.name} name="opponent" defaultChecked={selectedPlayer == opponent.name} className="hidden" />
          <div className="opponent">
            <div>{opponent.name}</div>
            <div>Cards: {opponent.countHand}</div>
            <div>Books: {opponent.books}</div>
          </div>
        </label>
      )
    })
  }
}

export default OpponentListView
