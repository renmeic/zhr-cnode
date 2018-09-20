import axios from 'axios'
import store from '../store'

let base_url = 'https://cnodejs.org/api/v1/';
// topics 主题首页
export function getTopicsData(query_data) {
  return new Promise((resolve, reject) => {
    axios.get(`${base_url}topics`, {
      params: query_data
    })
    .then((response) => {
      resolve(response)
    })
    .catch((error) => {
      reject(error);
    });
  })
}

// topic 详情
export function getTopic(topic_id) {
  return new Promise((resolve, reject) => {
    axios.get(`${base_url}/topic/${topic_id}`)
    .then((response) => {
      resolve(response)
    })
    .catch((error) => {
      reject(error);
    });
  })
}

// 收藏、取消
export function collect(is_collect, topic_id) {
  let url = is_collect
    ? `${base_url}topic_collect/de_collect` 
    : `${base_url}topic_collect/collect`;

  return new Promise((resolve, reject) => {
    axios.post(url, {
      topic_id: topic_id
    })
    .then((response) => {
      resolve(response)
    })
    .catch((error) => {
      reject(error);
    });
  })
}

// 用户详情
export function getUser(username) {
  return new Promise((resolve, reject) => {
    axios.get(`${base_url}user/${username}`)
    .then((response) => {
      resolve(response)
    })
    .catch((error) => {
      reject(error);
    });
  })
}

// 用户所收藏的主题
export function getCollect(username) {
  return new Promise((resolve, reject) => {
    axios.get(`${base_url}topic_collect/${username}`)
    .then((response) => {
      resolve(response)
    })
    .catch((error) => {
      reject(error);
    });
  })
}

// 请求用户登录
export function getLoggedUser() {
  setTimeout(() => {
    store.dispatch({
      type: 'GET_LOGGED_USER'
    })
  }, 500)
}

// 用户登录
export function login(token) {
  return new Promise((resolve, reject) => {
    axios.post(`${base_url}accesstoken`, {
      accesstoken: token
    })
    .then((res) => {
      window.localStorage.access_token = token
      store.dispatch({
        type: 'SET_LOGGED_USER',
        logged: true,
        token: token,
        loginname: res.data.loginname,
        avatar_url: res.data.avatar_url,
      })
      resolve(res)
    })
    .catch((err) => {
      console.log(err)
    })
  })
}

// 检查本地accesstoken
export function checkLogin() {
  if(window.localStorage.access_token) {
    axios.post(`${base_url}accesstoken`)
    .then((res) => {
      store.dispatch({
        type: 'SET_LOGGED_USER',
        logged: true,
        token: window.localStorage.access_token,
        loginname: res.data.loginname,
        avatar_url: res.data.avatar_url,
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }
}

// 登出
export function logout() {
  return new Promise((resolve, reject) => {
    window.localStorage.removeItem('access_token')
    store.dispatch({
      type: 'SET_LOGGED_USER',
      logged: false
    })
    resolve()
  })
}

// 为评论点赞
export function like(reply_id) {
  return new Promise((resolve, reject) => {
    axios.post(`${base_url}/reply/${reply_id}/ups`)
    .then((res) => {
      resolve(res)
    })
    .catch((err) => {
      console.log(err)
    })
  })
}
