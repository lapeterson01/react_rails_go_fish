import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CardSetView from './CardSetView'

class HandView extends Component {
  static propTypes = {
    hand: PropTypes.object.isRequired,
    setRank: PropTypes.func.isRequired,
    selectedRank: PropTypes.string
  }

  render() {
    return Object.entries(this.props.hand.asObject()).map((set) => {
      const rank = set[0]
      const cards = set[1]
      return (
        <li key={rank} className="hand--card-item">
          <label onClick={this.props.setRank}>
            <input className="hidden" type="radio" value={rank} checked={this.props.selectedRank === rank} />
            <ul className="card--list">
              <CardSetView rank={rank} cards={cards} setRank={this.props.setRank} selectedRank={this.props.selectedRank} />
            </ul>
          </label>
        </li>
      )
    })
  }
}

export default HandView
