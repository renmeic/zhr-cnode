import React from 'react'
import Avatar from './Avatar'

export default class Sidebar extends React.Component {
	render() {
		return (
      <div className='sidebar'>
  			<div className="panel">
          <div className="panel-header">作者</div>
          <div className="panel-body">
            <Avatar href='/users/ren816' />
          </div>
        </div>
      </div>
		)
	}
}
