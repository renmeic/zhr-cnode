import { createStore, combineReducers } from 'redux'
import topicsReducer from './reducers/topics'
import loggedUserReducer from './reducers/loggedUserReducer'
const reducers = combineReducers({
  loggedUserState: loggedUserReducer,
  topicsState: topicsReducer
})

const store = createStore(reducers)

export default store
