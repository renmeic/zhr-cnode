import React from 'react'
import {connect} from 'react-redux'
import { NavLink } from 'react-router-dom'
import { logout } from '../utils/xhr'

class Header extends React.Component {
	render() {
		return (
			<header className='header'>
        <div className='header-wrap'>
          <h1 className='logo'>
            <a><img src='/images/cnodejs.svg' alt='cnodejs logo'/></a>
          </h1>
          <nav className='nav'>
            <NavLink to="/" exact activeClassName="active">首页</NavLink>
            <a href="https://github.com/renmeic/" target="_blank" rel="noopener noreferrer">关于作者</a>
            {
              this.props.logged
              ? <a onClick={() => logout()}>退出</a>
              : <NavLink to="/auth/login" activeClassName="active">登录</NavLink>
            }
          </nav>
        </div>
      </header>
		)
	}
}

const mapStateToProps = ({ loggedUserState }) => {
  // console.log(loggedUserState)
  return {
    logged: loggedUserState.logged
  }
}

export default connect(mapStateToProps)(Header)
