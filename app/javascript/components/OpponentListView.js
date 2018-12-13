import React, { Component } from 'react'
import PropTypes from 'prop-types'

class OpponentListView extends Component {
  static propTypes = {
    opponents: PropTypes.array.isRequired,
    setPlayer: PropTypes.func.isRequired,
    selectedPlayer: PropTypes.string
  }

  render() {
    return this.props.opponents.map((opponent) => {
      return (
        <label key={opponent.id()} className="game-list-item" onClick={this.props.setPlayer}>
          <input type="radio" value={opponent.id()} name="opponent" checked={this.props.selectedPlayer === opponent.id().toString()} className="hidden" />
          <div className="opponent">
            <div>{opponent.name()}</div>
            <div>Cards: {opponent.handCount()}</div>
            <div>Books: {opponent.books()}</div>
          </div>
        </label>
      )
    })
  }
}

export default OpponentListView
