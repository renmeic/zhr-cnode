import React from 'react'

export default class Sidebar extends React.Component {
	render() {
		return (
      <div className='sidebar'>
  			<div class="personal-information">
          <div>
            <div class="top">作者</div>
            <div class="info user-select-none">
              <a href="#/user/ren816">
                <img src="https://avatars2.githubusercontent.com/u/13691408?v=4&amp;s=120" alt="头像"/>
              </a>
              <a href="#/user/ren816"><em class="nickname">ren816</em></a>
            </div>
          </div>
        </div>
      </div>
		)
	}
}
