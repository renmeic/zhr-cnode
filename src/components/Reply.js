import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
// import LikeButton from './LikeButton'
import { getRelativeTime } from '../utils/index'
import { like } from '../utils/service'

export default class Reply extends React.Component {
  static propTypes = {
    reply: PropTypes.object,
    index: PropTypes.number,
    logged: PropTypes.bool,
    onLike: PropTypes.func,
  }
  static defaultProps = {
    reply: {
      author: {}
    }
  }
  scrollToAnchor(anchorName) {
    if (anchorName) {
        let anchorElement = document.getElementById(anchorName);
        if(anchorElement) { anchorElement.scrollIntoView(); }
    }
  }
  // 回复
  handleToReply (loginname) {
    let top = document.querySelector('.footer').offsetTop;
    window.scrollTo({
      top: top - 80,
      behavior: 'smooth'
    });
  }
  handleLike(id, loginname, index) {
    if(!this.props.logged) return alert('请先登录')
    if(loginname === this.props.username) return alert('不能点赞自己')
    like(id)
    .then((res) => {
      // console.log(res)
      if(res.data.success) {
        this.props.onLike(res.data.action, index)
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }
  render() {
    // console.log(this.props.reply)
    const {id, author, ups, content, create_at, is_uped} = this.props.reply
    return (
      <li className='reply-list-item'>
        <div className="author_content">
          <Link to={`/users/${author.loginname}`} className="user_avatar">
            <img src={author.avatar_url} title={author.loginname} alt={author.loginname}/>
          </Link>

          <div className="user_info">
            <Link className="dark reply_author" to={`/users/${author.loginname}`}>{author.loginname}</Link>
            <a id={id} className="reply_time" href={`#${id}`} onClick={this.scrollToAnchor.bind(this, id)}>{this.props.index+1}楼•{getRelativeTime(create_at)}</a>
          </div>
          <div className="like">
            <i onClick={this.handleLike.bind(this, id, author.loginname, this.props.index)} className={is_uped ? 'fa fa-thumbs-up': 'fa fa-thumbs-o-up'} title="喜欢"></i>
            <span className="count">
              {ups.length}
            </span>
            <i onClick={this.handleToReply.bind(this)} className="fa fa-reply"></i>
          </div>
        </div>
        <div className="reply_content from-xudafeng">
          <div className='markdown-body' dangerouslySetInnerHTML={{__html: content}}>
          </div>
        </div>
      </li>
    )
  }
}
