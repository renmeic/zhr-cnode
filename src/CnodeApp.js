import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import AuthorizedRoute from './AuthorizedRoute'

// Layouts
import UnauthorizedLayout from './layouts/UnauthorizedLayout'
import PrimaryLayout from './layouts/PrimaryLayout'

export default class CnodeApp extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <PrimaryLayout/>
      </BrowserRouter>
    )
  }
}
