import React, { Component } from 'react'
import PropTypes from 'prop-types'

class OpponentListView extends Component {
  static propTypes = {
    opponents: PropTypes.object.isRequired,
    setPlayer: PropTypes.func.isRequired
  }

  render() {
    return this.props.opponents.map((opponent) => {
      return (
        <label key={opponent.id} className="game-list-item" style={{cursor: "pointer"}} onClick={this.props.setPlayer}>
          <input type="radio" value={opponent.name} name="opponent" checked={this.props.selectedPlayer === opponent.name} className="hidden" />
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
