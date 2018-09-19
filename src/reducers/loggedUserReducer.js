const initialState = {
  pending: true,
  logged: false,
  token: window.localStorage.access_token || '',
  loginname: '',
  avatar_url: '',
}

const loggedUserReducer = (state = initialState, action) => {
  
  if (action.type === 'GET_LOGGED_USER') {
    return Object.assign({}, state, {
      pending: false
    })
  }
  
  if (action.type === 'SET_LOGGED_USER') {
    return Object.assign({}, state, {
      pending: false,
      logged: action.logged,
      token: action.token,
      loginname: action.loginname,
      avatar_url: action.avatar_url,
    })
  }
  
  return state
}

export default loggedUserReducer
