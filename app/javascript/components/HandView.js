import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CardSetView from './CardSetView'

class HandView extends Component {
  static propTypes = {
    hand: PropTypes.object.isRequired
  }

  render() {
    return Object.entries(this.props.hand.asObject()).map((set) => {
      const rank = set[0]
      const cards = set[1]
      return (
        <li key={rank} className="hand--card-item">
          <ul className="card--list">
            <CardSetView rank={rank} cards={cards} />
        	</ul>
        </li>
      )
    })
  }
}

export default HandView
