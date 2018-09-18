import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import TopicList from '../components/TopicList'
import { getRelativeTime } from '../utils/index'

class UserProfilePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {}
    }
  }
  componentDidMount() {
    this._loadUserData()
  }
  _loadUserData() {
    let { user_id } = this.props.match.params
    let _this = this
    axios.get(`https://cnodejs.org/api/v1/user/${user_id}`)
    .then(function(response) {
      console.log(response.data.data)
      if(response.data.success) {
        _this.setState({
          user: response.data.data
        })
      }
    })
    .catch(function(error) {
      console.log(error)
    });
  }
  render() {
    const { user } = this.state
    return (
      <div className="topics-container user">
          <div className="box">
              <div className="box-title">
                  <Link to="/">主页</Link>
                  <em className="slashes"> / </em>
                  <span>个人主页</span>
              </div>
              <div className="user-info">
                  <div className="user">
                      <img src={user.avatar_url} alt="avatar" />
                      <span>{ user.loginname }</span>
                  </div>
                  <div>{ user.score } 积分</div>
                  <div className="view-topics-collections">
                      <Link to={`/users/${user.loginname}/collections`}>查看话题收藏</Link>
                  </div>
                  <div className="create-at">注册时间 { getRelativeTime(user.create_at) }</div>
              </div>
          </div>
          <div className="box">
              <div className="box-title">最近创建的话题</div>
              <TopicList topics={user.recent_replies}/>
          </div>
          <div className="box">
              <div className="box-title">最近参与的话题</div>
              <TopicList topics={user.recent_topics}/>
          </div>
      </div>
    )
  }
}

export default UserProfilePage
