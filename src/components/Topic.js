import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Tag from './Tag'
import { getTopicType, getRelativeTime } from '../utils/index'

export default class Topic extends React.Component {
  static propTypes = {
    topic: PropTypes.object
  }
  static defaultProps = {
    topic: {}
  }
  // componentWillMount() {
  //   console.log(this.props.topic)
  // }
  render() {
    const {id, author, title, visit_count, reply_count, top, good, tab, last_reply_at } = this.props.topic
    return (
      <li className='topic-list-item'>
        <Link to={`/users/${author.loginname}`} className='avatar'>
          <img src={author.avatar_url} alt={author.loginname} title={author.loginname}/>
        </Link>
        { reply_count ? <span className='reply-view'>{reply_count}/{visit_count}</span> : '' }
        
        <div className='title-box'>
          {
            top ? <Tag tag='置顶' highlight='highlight'/>
              : good ? <Tag tag='精华' highlight='highlight'/>
              : tab ? <Tag tag={getTopicType(tab)}/>: ''
          }
          
          <Link to={`/topics/${id}`}><div className="title">{title}</div></Link>
        </div>
        <span className='last-reply-time'>{getRelativeTime(last_reply_at)}</span>
      </li>
    )
  }
}
