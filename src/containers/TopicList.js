import React from 'react'
import PropTypes from 'prop-types'
import TopicList from '../components/TopicList'
import {connect} from 'react-redux'
import { requestTopics, receiveTopics } from '../reducers/topics'
import axios from 'axios'

class TopicListContainer extends React.Component {
  static propTypes = {
    topics: PropTypes.array
  }
  componentWillMount() {
    const { page, tab, requestTopics, receiveTopics } = this.props
    requestTopics()
    axios.get(`https://cnodejs.org/api/v1/topics?page=${page}&tab=${tab}`)
    .then(function(response) {
      // console.log(response)
      receiveTopics(response.data.data, page+1, tab)
    })
    .catch(function(error) {
      console.log(error)
    });
  }
  render() {
    return (
      <TopicList
        topics={this.props.topics} />
    )
  }
}

const mapStateToProps = ({ topicsState }) => {
  return {
    isFetching: topicsState.isFetching,
    topics: topicsState.topics,
    page: topicsState.page,
    tab: topicsState.tab
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    'requestTopics': () => {
      dispatch(requestTopics())
    },
    'receiveTopics': (topics, page, tab) => {
      dispatch(receiveTopics(topics, page, tab))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicListContainer)


