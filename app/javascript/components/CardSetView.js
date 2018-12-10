import React, { Component } from 'react'
import PropTypes from 'prop-types'

class CardSetView extends Component {
  static propTypes = {
    rank: PropTypes.string.isRequired,
    cards: PropTypes.array.isRequired
  }

  render() {
    return this.props.cards.map((card, index) => {
      let top = index * 20
      return <li key={this.props.rank} className="card" style={{top: `${top}`, zIndex: `${index}`}}>{card.toString()}</li>
    })
  }
}

export default CardSetView
