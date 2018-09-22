import React from 'react'
import {Link} from 'react-router-dom'
import Avatar from './Avatar'

export default class Sidebar extends React.Component {
	render() {
    console.log(this.props)
    const {logged, loginname, avatar_url} = this.props.userinfo
		return (
      <div className='sidebar'>
        {logged
        ?
  			<div className="panel">
          <div className="panel-header">作者</div>
          <div className="panel-body">
            <Avatar href={`/users/${loginname}`} name={loginname} src={avatar_url} />
          </div>
        </div>
        :
        <div className="panel">
          <div className="panel-body">
            CNode：Node.js专业中文社区
          当前是游客状态，您可以<Link to='/auth/login'>登录</Link>
          </div>
        </div>
        }
      </div>
		)
	}
}
