import store from '../store'
import axios from 'axios'

// These are "fake network" function that in a real scenario would
// call the backend API and upon return would update your redux state.
// We're just going to skip to the redux part and add a setTimeout
// for some fake latency

export const getLoggedUser = () => {
  setTimeout(() => {
    store.dispatch({
      type: 'GET_LOGGED_USER'
    })
  }, 500)
}

export const login = (token) => {
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     store.dispatch({
  //       type: 'SET_LOGGED_USER',
  //       logged: true
  //     })
  //     resolve()
  //   }, 500)
  // })
  return new Promise((resolve, reject) => {
    // console.log(token)
    axios.post(`https://cnodejs.org/api/v1/accesstoken`, {
      accesstoken: token
    })
    .then(function(res) {
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
    .catch(function(err) {
      console.log(err)
    })
  })
}

export const checkLogin = () => {
  if(window.localStorage.access_token) {
    axios.post(`https://cnodejs.org/api/v1/accesstoken`, {
      accesstoken: window.localStorage.access_token
    })
    .then(function(res) {
      store.dispatch({
        type: 'SET_LOGGED_USER',
        logged: true,
        token: window.localStorage.access_token,
        loginname: res.data.loginname,
        avatar_url: res.data.avatar_url,
      })
    })
    .catch(function(err) {
      console.log(err)
    })
    }
}

export const logout = () => {
  return new Promise((resolve, reject) => {
    window.localStorage.removeItem('access_token')
    store.dispatch({
      type: 'SET_LOGGED_USER',
      logged: false
    })
    resolve()
  })
}
