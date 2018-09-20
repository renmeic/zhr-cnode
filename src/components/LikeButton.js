import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {like} from '../utils/service'

class LikeButton extends React.Component {
  static propTypes = {
    ups: PropTypes.number,
    replyId: PropTypes.string
  }
  static defaultProps= {
    ups: 0,
    replyId: ''
  }
  // 回复
  handleToReply (loginname) {
    let top = document.querySelector('.footer').offsetTop;
    window.scrollTo({
      top: top - 80,
      behavior: 'smooth'
    });
  }
  handleLike() {
    if(!this.props.logged) return alert('请先登录')
    like(this.props.replyId)
    .then((res) => {
      console.log(res)
      if(res.data.success) {
        if(res.data.action === 'up') {
          this.props.ups = this.props.ups + 1
        }
        if(res.data.action === 'down') {
          this.props.ups = this.props.ups - 1
        }
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }
  render() {
    return (
      <div className="like">
        <i onClick={this.handleLike.bind(this)} className="fa fa-thumbs-o-up" title="喜欢"></i>
        <span className="count">
          {this.props.ups}
        </span>
        <i onClick={this.handleToReply.bind(this)} className="fa fa-reply"></i>
      </div>
    )
  }
}

const mapStateToProps = ({ loggedUserState }) => {
  return {
    logged: loggedUserState.logged
  }
}

export default connect(mapStateToProps)(LikeButton)
