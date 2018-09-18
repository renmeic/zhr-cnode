import React from 'react'
import { NavLink } from 'react-router-dom'

export default class Header extends React.Component {
	render() {
		return (
			<header className='header'>
        <div className='header-wrap'>
          <h1 className='logo'>
            <a><img src='./images/cnodejs.svg' alt='cnodejs logo'/></a>
          </h1>
          <nav className='nav'>
            <NavLink to="/" exact activeClassName="active">首页</NavLink>
            <NavLink to="/users" activeClassName="active">关于作者</NavLink>
            <NavLink to="/auth/login" activeClassName="active">登录</NavLink>
          </nav>
        </div>
      </header>
		)
	}
}
