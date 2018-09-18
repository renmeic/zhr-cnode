import React from 'react'
import PropTypes from 'prop-types'

export default class Tag extends React.Component {
  static propTypes = {
    tag: PropTypes.string,
    highlight: PropTypes.string
  }
  render() {
    return (
      <span className={''.concat('tag',' ', this.props.highlight)}>{this.props.tag}</span>
    )
  }
}
