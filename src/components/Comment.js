import React from 'react'
import PropTypes from 'prop-types'
import SimpleMDE from 'simplemde'
import {createComment} from '../utils/service'

export default class Comment extends React.Component {
  static propTypes = {
    topicId: PropTypes.string,
    at: PropTypes.string,
    onLoad: PropTypes.func,
  }
  static defaultProps = {
    at: ''
  }
  constructor() {
    super()
    this.state = {
      text: '回复'
    }
  }
  componentDidMount() {
    this.initMarkdownEditor()
  }
  componentDidUpdate() {
    if(this.props.at) this.simplemde.value(`@${this.props.at}`)
  }
  initMarkdownEditor() {
    this.simplemde = new SimpleMDE({ element: document.getElementById("markdown-editor") })
  }
  handleComment() {
    if(this.state.text === '发送中...') return
    let val = this.simplemde.value();
    if( !val ) return alert('内容不能为空!')
    this.setState({ text: '发送中...' })
    createComment(this.props.topicId, val)
    .then((res) => {
      if(res.data.success) {
        this.simplemde.value('')
        alert('发送成功!')
        this.setState({ text: '回复' })
        // 更新资源
        this.props.onLoad();
      }
    })
    .catch((err) => {

    })
  }
  render() {
    return (
      <div className='panel-body'>
        <textarea id="markdown-editor"></textarea>
        <div>
          <button className='primary-btn' type="button" onClick={this.handleComment.bind(this)}>{this.state.text}</button>
        </div>
      </div>
    )
  }
}
