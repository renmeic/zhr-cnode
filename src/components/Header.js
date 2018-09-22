import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { logout } from '../utils/service'

class Header extends React.Component {
	render() {
    // console.log(this.props.logged)
		return (
			<header className='header'>
        <div className='header-wrap'>
          <h1 className='logo'>
            <Link to='/'><img src='/images/cnodejs.svg' alt='cnodejs logo'/></Link>
          </h1>
          <nav className='nav'>
            <NavLink to="/" exact activeClassName="active">首页</NavLink>
            <a href="https://github.com/renmeic/" target="_blank" rel="noopener noreferrer">关于作者</a>
            {
              this.props.logged
              ? <span>
                  <NavLink to='/create'>创建话题</NavLink>
                  <a onClick={() => logout()}>退出</a>
                </span>
              : <NavLink to="/auth/login" activeClassName="active">登录</NavLink>
            }
          </nav>
        </div>
      </header>
		)
	}
}

export default Header
