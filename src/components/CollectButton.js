import React from 'react'
import PropTypes from 'prop-types'

import {collect} from '../utils/service'

class CollectButton extends React.Component {
  static propTypes = {
    collect: PropTypes.bool,
    logged: PropTypes.bool,
    onCollect: PropTypes.func
  }
  handleCollection() {
    collect(this.props.collect, this.props.topicId)
    .then((response) => {
      this.props.onCollect()
    })
    .catch((error) => {
      console.log(error)
    })
  }
  render() {
    return (
      <div>
        {
          this.props.logged && <div className="collection user-select-none">
            <button onClick={this.handleCollection.bind(this)}>{this.props.collect ? '取消收藏' : '收藏'}</button>
            </div>
        }
      </div>
    )
  }
}

export default CollectButton


