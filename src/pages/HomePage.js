import React from 'react'
import { NavLink } from 'react-router-dom'
import TopicList from '../components/TopicList'
import queryString from 'query-string'
import axios from 'axios'
import { Pagination } from 'antd'

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,        // 当前页
      total: 9999,    // 总条数
      topics: [],     // 主题列表
      limit: 40,      // 页数
      mark: false,
    }
  }
  componentDidMount() {
    let page = parseInt(queryString.parse(this.props.location.search).page, 10) || 1
    this.setState({ page }, () => {
      this._loadTopicsData()
    })
    
  }
  componentDidUpdate(prevProps, prevState, prevContext) {
    if (prevProps.location !== this.props.location) {
      let page = parseInt(queryString.parse(this.props.location.search).page, 10)
      if( !page ) {
          this.setState({page: 1}, () => {
              this._loadTopicsData();
          });
          return;
      }
      this._loadTopicsData()
    }
  }
  _loadTopicsData() {
    this.setState({
        mark: true,
    });
    let _this = this
    let beforeTime = Date.now()
    axios.get(`https://cnodejs.org/api/v1/topics`, {
      params: {
        page: this.state.page,
        tab: queryString.parse(this.props.location.search).tab || 'all',
        limit: this.state.limit,
      }
    })
    .then(function(response) {
      var afterTime = Date.now() - beforeTime;
      if( afterTime <= 300 ) {
          setTimeout(() => {
              _this.setState({
                  mark: false,
              });   
          }, 300 - afterTime)
      } else {
          _this.setState({
              mark: false,
          });
      }
      if(response.data.success) {
        _this.setState({
          topics: response.data.data
        })
      }
    })
    .catch(function(error) {
      console.log(error)
    });
  }
  handleIsActive(tab) {
    const search = queryString.parse(this.props.location.search)
    if(!search.tab && tab === 'all') {
      return true
    } else {
      return search.tab === tab
    }
  }
  hanleChange(page) {
    this.setState({
        page,
    })
    const tab = queryString.parse(this.props.location.search).tab || 'all'
    this.props.history.push({
        pathname: '/',
        search: `?tab=${tab}&page=${page}`,
    });
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div className='content'>
        <div className='topic-tab'>
          <NavLink to="/" isActive={this.handleIsActive.bind(this, 'all')} className='topic-tab-item'>全部</NavLink>
          <NavLink to="/?tab=good" isActive={this.handleIsActive.bind(this, 'good')} className='topic-tab-item'>精华</NavLink>
          <NavLink to="/?tab=share" isActive={this.handleIsActive.bind(this, 'share')} className='topic-tab-item'>分享</NavLink>
          <NavLink to="/?tab=ask" isActive={this.handleIsActive.bind(this, 'ask')} className='topic-tab-item'>问答</NavLink>
          <NavLink to="/?tab=job" isActive={this.handleIsActive.bind(this, 'job')} className='topic-tab-item'>招聘</NavLink>
          <NavLink to="/?tab=dev" isActive={this.handleIsActive.bind(this, 'dev')} className='topic-tab-item'>客户端测试</NavLink>
        </div>
        <div className='topics-wrap'>
          <div className="mark-box" style={{display: !this.state.mark ? 'none' : ''}}>
              <div className="mark-line"></div>
              <div className="mark-line"></div>
              <div className="mark-line"></div>
          </div>
          <TopicList topics={this.state.topics}/>
          <Pagination current={this.state.page} onChange={this.hanleChange.bind(this)} total={this.state.total} pageSize={this.state.limit} />
        </div>
      </div>
    )
  }
}

export default HomePage
