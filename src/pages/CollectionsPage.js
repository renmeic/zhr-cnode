import React from 'react'
import {Link} from 'react-router-dom'
import TopicList from '../components/TopicList'
import {getCollect} from '../utils/service'

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
    getCollect(user_id)
    .then((response) => {
      // console.log(response.data.data)
      if(response.data.success) {
        this.setState({
          topics: response.data.data
        })
      }
    })
    .catch((error) => {
      console.log(error)
    });
  }
  render() {
    return (
      <div className='content'>
        <div className='panel'>
          <div className="panel-header">
            <div className='breadcrumb'>
              <Link to="/">主页</Link>
              <em className="slashes"> / </em>
              <span>{this.props.match.params.user_id} 收藏的话题</span>
            </div>
          </div>
          <div className='panel-body'>
            {
              this.state.topics.length
              ? <TopicList topics={this.state.topics}/>
              : '无'
            }

          </div>
        </div>
      </div>
    )
  }
}
