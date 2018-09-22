import React from 'react'
import {Link} from 'react-router-dom'
import TopicList from '../components/TopicList'
import Avatar from '../components/Avatar'
import { getRelativeTime } from '../utils/index'
import { getUser } from '../utils/service'

class UserProfilePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        recent_replies: [],
        recent_topics: []
      }
    }
  }
  componentDidMount() {
    this._loadUserData()
  }
  _loadUserData() {
    let { user_id } = this.props.match.params
    getUser(user_id)
    .then((response) => {
      // console.log(response.data.data)
      if(response.data.success) {
        this.setState({
          user: response.data.data
        })
      }
    })
    .catch((error) => {
      console.log(error)
    });
  }
  render() {
    const { user } = this.state
    return (
      <div className="content">
          <div className="panel userprofile-panel">
              <div className="panel-header">
                <div className='breadcrumb'>
                  <Link to="/">主页</Link>
                  <em className="slashes"> / </em>
                  <span>个人主页</span>
                </div>
              </div>
              <div className="panel-body">
                <Avatar tag='span' src={user.avatar_url} name={user.loginname}/>
                <span className='meta'>{ user.score } 积分</span>
                <Link className='meta' to={`/users/${user.loginname}/collections`}>查看话题收藏</Link>
                <span className="meta">注册时间 { getRelativeTime(user.create_at) }</span>
              </div>
          </div>
          <div className="panel">
              <div className="panel-header">最近创建的话题</div>
              <div className='panel-body'>
                { user.recent_replies.length
                  ? <TopicList topics={user.recent_replies}/>
                  : '无' }
              </div>
          </div>
          <div className="panel">
              <div className="panel-header">最近参与的话题</div>
              <div className='panel-body'>
                { user.recent_topics.length
                  ? <TopicList topics={user.recent_topics}/>
                  : '无' }
              </div>
          </div>
      </div>
    )
  }
}

export default UserProfilePage
