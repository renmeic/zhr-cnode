import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './github-markdown.min.css';
import './index.css';
import { Provider } from 'react-redux'
import CnodeApp from './CnodeApp'
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <CnodeApp/>
  </Provider>, document.getElementById('root'));
