import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import TopicList from '../components/TopicList'

export default class CollectionsPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      topics: []
    }
  }
  componentDidMount() {
    this._loadCollectionsData()
  }
  _loadCollectionsData() {
    let { user_id } = this.props.match.params
    let _this = this
    axios.get(`https://cnodejs.org/api/v1/topic_collect/${user_id}`)
    .then(function(response) {
      // console.log(response.data.data)
      if(response.data.success) {
        _this.setState({
          topics: response.data.data
        })
      }
    })
    .catch(function(error) {
      console.log(error)
    });
  }
  render() {
    return (
      <div className='collections'>
        <div className="collections-title">
          <Link to="/">主页</Link><em className="slashes"> / </em>
          <span>{this.props.match.params.user_id} 收藏的话题</span>
        </div>
        <TopicList topics={this.state.topics}/>
      </div>
    )
  }
}
