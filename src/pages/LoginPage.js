import React from 'react'
import { login } from '../utils/service'

class LoginPage extends React.Component {
  constructor() {
    super()
    this.state = {
      token: ''
    }
  }
  componentDidMount() {
    if(window.localStorage.access_token) {
      this.props.history.replace('/')
    }
    // console.log(this.props.history)
  }
  handleSubmit() {
    let {token} = this.state
    if(!token) return alert('Access Token 不能为空');
    login(token)
    .then((res) => {
      // console.log(res)
      this.props.history.goBack()
    })
  }
  handleOnChange(e) {
    this.setState({ token: e.target.value })
  }
  render() {
    return (
      <div className='login'>
        <div className="input last">
          <input onChange={this.handleOnChange.bind(this)} type="text" maxLength="50" placeholder="Access Token"/>
        </div>
        <div className="get-access-token">
          <a href="https://cnodejs.org/setting" rel="noopener noreferrer" target="_blank">如何获取Access Token？</a>
        </div>
        <div className="submit user-select-none" onClick={this.handleSubmit.bind(this)}>Sign in</div>
        {/*<button onClick={() => {
          login().then(() => {
            this.props.history.push('/app')
          })
        }}>Login</button>*/}
      </div>
    )
  }
}

export default LoginPage
