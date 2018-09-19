import React from 'react'
import { Switch, Route } from 'react-router-dom'

// Pages
import MessagePage from '../pages/MessagePage'

const AuthorizedLayout = () => (
  <div className="authorized-layout">
    {/*
    
    Imagine this could be a general layout for all unauthorized pages like
    the login page, forgot password, email-verified, etc...
    
    For this example project, we'll just have a Login Page
    
    */}
    <Switch>
      <Route path="/messages" component={MessagePage} />
    </Switch>
  </div>
)

export default AuthorizedLayout
