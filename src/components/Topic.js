import React from 'react'

export default class Topic extends React.Component {
  render() {
    return (
      <li className='topic-list-item'>
        <a className='avatar'>
          <img src="https://avatars3.githubusercontent.com/u/7105727?v=4&amp;s=120" alt="头像" title="kinm"/>
        </a>
        <p className='reply-view'>3/284</p>
        <div className='title-box'>
          <span className="tag ask">问答</span>
          <a className="title" href="#/topic/5b9b2ed937b3005a0b0e702a">为什么中国人写不出《JS高程》、《深入理解es6》这类通俗易懂的好书？</a>
        </div>
        <span className='last-reply-time'>4 分钟前</span>
      </li>
    )
  }
}
