import React, { Component } from 'react'
import PropTypes from 'prop-types'
import HandView from './HandView'

class PlayerView extends Component {
  static propTypes = {
    currentUser: PropTypes.object.isRequired,
    isCurrentPlayer: PropTypes.bool.isRequired,
    setRank: PropTypes.func.isRequired,
    selectedRank: PropTypes.string
  }

  render() {
    return (
      <div className="current-player__hand">
        <div className="current-player__info">
          <div>Cards: {this.props.currentUser.handCount()}</div>
          <div>{this.props.currentUser.name()}</div>
          <div>Books: {this.props.currentUser.booksCount()}</div>
        </div>

        <ul className="hand--card-list">
          <HandView
            hand={this.props.currentUser.hand()}
            isCurrentPlayer={this.props.isCurrentPlayer}
            setRank={this.props.setRank}
            selectedRank={this.props.selectedRank}
          />
        </ul>
      </div>
    )
  }
}

export default PlayerView
