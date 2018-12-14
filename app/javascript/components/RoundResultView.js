import React, { Component } from 'react'
import PropTypes from 'prop-types'

class RoundResultView extends Component {
  static propTypes = {
    roundResult: PropTypes.object
  }

  render() {
    return (
      <div className="play">
        <div>{this.props.roundResult.toString()}</div>
        <div>{this.props.roundResult.turnMessage()}</div>
      </div>
    )
  }
}

export default RoundResultView
