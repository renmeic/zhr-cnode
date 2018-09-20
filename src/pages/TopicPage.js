import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Tag from '../components/Tag'
import Reply from '../components/Reply'
import Comment from '../components/Comment'
import CollectButton from '../components/CollectButton'
import { getRelativeTime } from '../utils/index'
import { getTopic } from '../utils/service'

class TopicPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      topicDetail: {
        author: {},
        replies: [],
        at: '',
      }
    }
  }
  componentDidMount() {
    this._loadTopicDetail()
  }
  _loadTopicDetail() {
    // console.log(this.props.match)
    let { topic_id } = this.props.match.params
    getTopic(topic_id)
    .then((response) => {
      if(response.data.success) {
        // console.log(response.data.data)
        this.setState({
          topicDetail: response.data.data,
          is_collect: response.data.data.is_collect
        })
      }
    })
    .catch((error) => {
      console.log(error)
    })
  }
  handleCollect() {
    // 收藏 && 取消收藏主题
    this.setState({is_collect: !this.state.is_collect})
  }
  handleLike(action, index) {
    // 点赞 && 取消
    // console.log(action)
    if( action === 'down' ) {
        this.state.topicDetail.replies[index].is_uped = false;
        this.state.topicDetail.replies[index].ups.pop();
    } else {
        this.state.topicDetail.replies[index].is_uped = true;
        this.state.topicDetail.replies[index].ups.push(Date.now());
    }
    this.setState({})
  }
  handleAt(at) {
    // console.log(at)
    this.setState({at: at})
  }
  render() {
    let {is_collect} = this.state
    let {id, title, visit_count, author, last_reply_at, create_at, top, good, content, replies} = this.state.topicDetail
    // console.log(replies)
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
              <CollectButton logged={this.props.logged} topicId={id} onCollect={this.handleCollect.bind(this)} collect={is_collect} />
              
            </div>
          </div>
          <div className='topic-body markdown-body' dangerouslySetInnerHTML={{__html: content}}>
          </div>
        </div>
        <ul className='reply-list'>
          {
            replies.map((reply, index) => 
              <Reply
                onLike={this.handleLike.bind(this)}
                onAt={this.handleAt.bind(this)}
                logged={this.props.logged}
                reply={reply}
                key={reply.id}
                username={this.props.loginname}
                index={index} />
            )
          }
        </ul>
        { this.props.logged &&
          <div className='panel' style={{marginTop:20}}>
            <div className='panel-header'>添加回复</div>
            <Comment at={this.state.at} topicId={id} onLoad={this._loadTopicDetail.bind(this)}/>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = ({loggedUserState}) => {
  return {
    logged: loggedUserState.logged,
    loginname: loggedUserState.loginname
  }
}

export default connect(mapStateToProps)(TopicPage)
