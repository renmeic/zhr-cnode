import React from 'react'
import PropTypes from 'prop-types'
import Topic from './Topic'

export default class TopicList extends React.Component {
  static propTypes = {
    topics: PropTypes.array
  }
  static defaultProps = {
    topics: []
  }
  render() {
    return (
      <ul>
        {this.props.topics.map((topic) =>
          <Topic topic={topic} key={topic.id} />
        )}
      </ul>
    )
  }
}
