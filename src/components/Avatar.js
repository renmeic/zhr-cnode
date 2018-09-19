import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

export default class Avatar extends React.Component {
  static propTypes = {
    tag: PropTypes.string,
    href: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    name: PropTypes.string,
    src: PropTypes.string,
  }
  static defaultProps = {
    tag: 'a',
    href: '',
    width: 50,
    height: 50,
    name: 'no name',
    src: 'https://avatars2.githubusercontent.com/u/13691408?v=4&amp;s=120',
  }
  render() {
    let Tag = this.props.tag
    if(this.props.tag === 'a') {
      Tag = Link
    }
    return (
      <Tag to={this.props.href} className="avatar">
        <img
          src={this.props.src}
          style={{width: this.props.width, height: this.props.height}}
          alt="头像"/>
        <span className='nickname'>{this.props.name}</span>
      </Tag>
    )
  }
}
