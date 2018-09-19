import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import { getRelativeTime } from '../utils/index'

export default class Reply extends React.Component {
  static propTypes = {
    reply: PropTypes.object,
    index: PropTypes.number
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
  render() {
    // console.log(this.props.reply)
    const {id, author, ups, content, create_at} = this.props.reply
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
          <div className="user_action">
            <span>
              <i className="fa up_btn
                fa-thumbs-o-up
                " title="喜欢"></i>
              <span className="up-count">
                {ups.length ? ups.length : ''}
              </span>
            </span>
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
