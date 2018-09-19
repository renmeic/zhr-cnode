import React from 'react'

export default class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="footer-wrap">
          <p><a href="https://github.com/renmeic/zhr-cnode">源码地址</a></p>
          <ul className="meta">
            <li>
              <span>CNode社区提供API</span>
              <a href="https://cnodejs.org">
                <img src="/images/cnodejs_f.svg" alt="cnode"/>
              </a>
            </li>
            <li>
              <span>github-pages提供网站托管</span>
              <a href="https://github.com">
                <img src="/images/github.svg" alt="github"/>
              </a>
            </li>
          </ul>
        </div>
      </footer>
    )
  }
}
