// action types
const REQUEST_TOPICS = 'REQUEST_TOPICS'
const RECEIVE_TOPICS = 'RECEIVE_TOPICS'
const SELECTED_TAB = 'SELECTED_TAB'

// reducer
export default function (state, action) {
  if(!state) {
    state = {
      selectedTab: 'all',
      tabData: {
        isFetching: false,
        topics: [],
        page: 1
      }
    }
  }
  switch(action.type) {
    case 'SELECTED_TAB':
      state.selectedTab = action.tab
      state.tabData.topics = []
      return { ...state }
    case 'REQUEST_TOPICS':
      state.tabData.isFetching = true
      return { ...state }
    case 'RECEIVE_TOPICS':
      state.tabData.isFetching = false
      state.tabData.topics = action.topics
      state.tabData.page = action.page
      state.tabData.limit = action.limit
      return { ...state }        
    default:
      return state
  }
}

// action creators
export const selectedTab =(tab) => {
  return { type: SELECTED_TAB, tab }
}
export const requestTopics = () => {
  return { type: REQUEST_TOPICS }
}
export const receiveTopics = (topics, page, limit) => {
  return { type: RECEIVE_TOPICS, topics, page, limit}
}
