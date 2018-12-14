import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CardSetView from './CardSetView'

class HandView extends Component {
  static propTypes = {
    hand: PropTypes.object.isRequired,
    isCurrentPlayer: PropTypes.bool.isRequired,
    setRank: PropTypes.func.isRequired,
    selectedRank: PropTypes.string
  }

  render() {
    return Object.entries(this.props.hand.asObject()).map((set) => {
      const rank = set[0]
      const cards = set[1]
      if (!this.props.isCurrentPlayer) {
        return (
          <li key={rank} className="hand--card-item">
            <ul className="card--list">
              <CardSetView cards={cards} />
            </ul>
          </li>
        )
      }

      return (
        <li key={rank} className="hand--card-item">
          <label onClick={this.props.setRank} id={`card_${rank}`}>
            <input
              className="hidden"
              type="radio"
              value={rank}
              checked={this.props.selectedRank === rank}
            />
            <ul className="card--list">
              <CardSetView cards={cards} />
            </ul>
          </label>
        </li>
      )
    })
  }
}

export default HandView
