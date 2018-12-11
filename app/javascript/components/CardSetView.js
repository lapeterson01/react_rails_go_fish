import React, { Component } from 'react'
import PropTypes from 'prop-types'

class CardSetView extends Component {
  static propTypes = {
    rank: PropTypes.string.isRequired,
    cards: PropTypes.array.isRequired
  }

  render() {
    return this.props.cards.map((card, index) => {
      const cardImg = require(`images/cards/${card.toString()}.png`)
      let top = index * 20
      return (
        <li key={card.toString()} className="card" style={{top: `${top}px`, zIndex: `${index}`}}>
          <img src={cardImg} alt="card" />
        </li>
      )
    })
  }
}

export default CardSetView
