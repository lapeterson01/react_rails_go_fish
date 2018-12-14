import React, { Component } from 'react'
import PropTypes from 'prop-types'

class RoundResultView extends Component {
  static propTypes = {
    roundResult: PropTypes.string
  }

  render() {
    return <div>{this.props.roundResult}</div>
  }
}

export default RoundResultView
