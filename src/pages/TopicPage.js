import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Tag from '../components/Tag'
import Reply from '../components/Reply'
import { getRelativeTime } from '../utils/index'

class TopicPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      topicDetail: {
        author: {},
        replies: []
      }
    }
  }
  componentDidMount() {
    this._loadTopicDetail()
  }
  _loadTopicDetail() {
    // console.log(this.props.match)
    let { topic_id } = this.props.match.params
    let _this = this
    axios.get(`https://cnodejs.org/api/v1/topic/${topic_id}`)
    .then(function(response) {
      console.log(response)
      if(response.data.success) {
        _this.setState({
          topicDetail: response.data.data
        })
      }
    })
    .catch(function(error) {
      console.log(error)
    });
  }
  handleCollection() {
    // 收藏 && 取消收藏主题
    let {id, is_collect} = this.state.topicDetail
    let url = is_collect ? `https://cnodejs.org/api/v1/topic_collect/de_collect` : `https://cnodejs.org/api/v1/topic_collect/collect`;
    console.log(url)
    axios.post(url, {
        topic_id: id
    })
    .then(res => {
        console.log(res)
        if( res.data.success ) {
           this.state.topicDetail.is_collect = !is_collect
           this.setState({})
        }
    })
    .catch(e => e);
  }
  render() {
    let {title, visit_count, author, last_reply_at, create_at, top, good, content, replies, is_collect} = this.state.topicDetail
    return (
      <div>
        <div className='topic-detail'>
          <div className="topic-header">
            <div className="topic-title">
              {
                top ? <Tag tag='置顶' highlight='highlight'/> : good ? <Tag tag='精华' highlight='highlight'/> : ''
              }
              <h2>{title}</h2>
            </div>
            <div className="topic-bottom">
              <div className="topic-info"><span>• 发布于 {getRelativeTime(create_at)} • 作者 </span>
                <Link to={`/users/${author.loginname}`}>{author.loginname}</Link>
                <span> • {visit_count} 次浏览 • 最后一次编辑是 {getRelativeTime(last_reply_at)} • 来自 分享</span>
              </div>
              {
                this.props.logged && <div className="collection user-select-none">
                  <button onClick={this.handleCollection.bind(this)}>{is_collect ? '取消收藏' : '收藏'}</button>
                  </div>
              }
            </div>
          </div>
          <div className='topic-body markdown-body' dangerouslySetInnerHTML={{__html: content}}>
          </div>
        </div>
        <ul className='reply-list'>
          {
            replies.map((reply, index) => 
              <Reply reply={reply} key={reply.id} index={index} />
            )
          }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({loggedUserState}) => {
  return {
    logged: loggedUserState.logged,
    token: loggedUserState.token
  }
}
export default connect(mapStateToProps)(TopicPage)
