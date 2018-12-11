import React, { Component } from 'react'
import PropTypes from 'prop-types'

class CardSetView extends Component {
  static propTypes = {
    rank: PropTypes.string.isRequired,
    cards: PropTypes.array.isRequired,
    setRank: PropTypes.func.isRequired
  }

  render() {
    return this.props.cards.map((card, index) => {
      let top = index * 20
      return (
        <li key={card.toString()} className="card" style={{top: `${top}px`, zIndex: `${index}`}}>
          <button className={card.toString()} type="submit" value={this.props.rank} onClick={this.props.setRank}></button>
        </li>
      )
    })
  }
}

export default CardSetView
