import React from 'react'

export default class Header extends React.Component {
	render() {
		return (
			<header className='header'>
        <div className='header-wrap'>
          <h1 className='logo'>
            <a><img src='./images/cnodejs.svg' alt='cnodejs logo'/></a>
          </h1>
          <nav className='nav'>
            <a>首页</a>
            <a>关于作者</a>
            <a>登录</a>
          </nav>
        </div>
      </header>
		)
	}
}
