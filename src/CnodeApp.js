import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import { BrowserRouter} from 'react-router-dom'
import {checkLogin} from './utils/xhr'

// Layouts
import PrimaryLayout from './layouts/PrimaryLayout'

class CnodeApp extends React.Component {
  componentWillMount() {
    checkLogin()
    this._axiosConfig();
  }
  _axiosConfig() {
    // 请求拦截器
    axios.interceptors.request.use(config => {
        // post请求默认发送参数
        if( config.method === 'post' ) {
            config.data = Object.assign({
                accesstoken: this.props.token,
            }, config.data);
        }
        // 如果是发送GET请求
        if( config.method === 'get' ) {
            config.params = Object.assign({
                accesstoken: this.props.token,
            }, config.params);
        }
        return config;
    }, error => {
        alert('API请求失败!');
        return Promise.reject(error);
    });
    
    // 响应拦截器
    axios.interceptors.response.use(res => {
        return res;
    }, error => {
        alert('请求超时或服务器出错!');
        return Promise.reject(error);
    });
  }
  render() {
    return (
      <BrowserRouter>
        <PrimaryLayout/>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = ({ loggedUserState }) => {
  // console.log(loggedUserState)
  return {
    token: loggedUserState.token
  }
}

export default connect(mapStateToProps)(CnodeApp)
