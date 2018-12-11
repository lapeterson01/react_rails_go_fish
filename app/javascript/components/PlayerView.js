import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Player from '../models/Player'
import HandView from './HandView'

class PlayerView extends Component {
  static propTypes = {
    currentUser: PropTypes.object.isRequired,
    setRank: PropTypes.func.isRequired
  }

  currentUser() {
    if (!this._currentUser) this._currentUser = Player.fromJson(this.props.currentUser)
    return this._currentUser
  }

  render() {
    return (
      <div className="current-player__hand">
        <div className="current-player__info">
          <div>Cards: {this.currentUser().handCount()}</div>
          <div>{this.currentUser().name()}</div>
          <div>Books: {this.currentUser().booksCount()}</div>
        </div>

        <ul className="hand--card-list">
          <HandView hand={this.currentUser().handKlass()} setRank={this.props.setRank} />
        </ul>
      </div>
    )
  }
}

export default PlayerView
