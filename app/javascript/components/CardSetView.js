import React, { Component } from 'react'
import PropTypes from 'prop-types'

class CardSetView extends Component {
  static propTypes = {
    cards: PropTypes.array.isRequired
  }

  render() {
    return this.props.cards.map((card, index) => {
      let top = index * 20
      return (
        <li key={card.toString()} className='card' style={{top: `${top}px`, zIndex: `${index}`}}>
          <div className={card.toString()}></div>
        </li>
      )
    })
  }
}

export default CardSetView
