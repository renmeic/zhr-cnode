import React from 'react'
import {Link} from 'react-router-dom'
import { Select, Input } from 'antd';
import SimpleMDE from 'simplemde'
import {createAndUpdateTopic, getTopic} from '../utils/service'

export default class CreateTopicPage extends React.Component {
  constructor() {
    super()
    this.state = {
      tab: 'dev',
      title: '',
    }
  }
  componentDidMount() {
    this.initMarkdownEditor()
    this._loadTopicData()
  }
  _loadTopicData() {
    const topic_id = this.props.match.params.topic_id
    if(topic_id) {
      console.log('update')
      getTopic(topic_id, false)
      .then((res) => {
        console.log(res)
        this.setState({
          title: res.data.data.title,
          tab: res.data.data.tab,
        })
        this.simplemde.value(res.data.data.content)
      })
      .catch((err) => {
        alert('此话题不存在！')
        this.props.history.goBack()
      })
    }
  }
  initMarkdownEditor() {
    this.simplemde = new SimpleMDE({
      element: document.getElementById("markdown-editor"),
      spellChecker: false,        // 启用拼写检查，会有背景色
      autoDownloadFontAwesome: false,   // 是否需要下载字体图标
    })
  }
  handleSelectChange(value) {
    this.setState({ tab: value })
  }
  handleInputChange(e) {
    this.setState({ title: e.target.value })
  }
  handleSumbit() {
    if(this.state.title.length < 5) alert('标题字数 5字以上')
    let value = this.simplemde.value()
    if(!value) alert('内容不能为空')
    const {title, tab} = this.state
    const topic_id = this.props.match.params.topic_id || ''
    createAndUpdateTopic(title, tab, value, topic_id)
    .then((res) => {
      console.log(res)
      if(res.data.success) {
        topic_id ? alert('更新成功！') : alert('发布成功！')
        this.props.history.push(`/topics/${res.data.topic_id}`)
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }
  render() {
    const Option = Select.Option
    return (
      <div className="panel">
        <div className='panel-header'>
          <div className='breadcrumb'>
            <Link to="/">主页</Link>
            <em className="slashes"> / </em>
            <span>发布话题</span>
          </div>
        </div>
        <div className='panel-body'>
          选择版块：<Select defaultValue={this.state.tab} style={{ width: 120 }} onChange={this.handleSelectChange.bind(this)}>
            <Option value="dev">客户端测试</Option>
            <Option value="share">分享</Option>
            <Option value="ask">问答</Option>
            <Option value="job">招聘</Option>
          </Select>
          <Input style={{marginTop:20}} placeholder="标题字数 5字以上" value={this.state.title} onChange={this.handleInputChange.bind(this)}/>
          <div style={{marginTop:20}}><textarea id="markdown-editor"></textarea></div>
          <div>
            <button onClick={this.handleSumbit.bind(this)} className='primary-btn' type="button">
              {this.props.match.params.topic_id ? '更新' : '发布'}</button>
          </div>
        </div>
      </div>
    )
  }
}
