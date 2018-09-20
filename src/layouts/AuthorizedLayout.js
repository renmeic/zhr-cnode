import React from 'react'
import { Switch, Route } from 'react-router-dom'

// Pages
import CreateTopicPage from '../pages/CreateTopicPage'

const AuthorizedLayout = () => (
  <div className="authorized-layout">
    {/*
    
    Imagine this could be a general layout for all unauthorized pages like
    the login page, forgot password, email-verified, etc...
    
    For this example project, we'll just have a Login Page
    
    */}
    <Switch>
      <Route path="/create" component={CreateTopicPage} />
      <Route path="/update/:topic_id" component={CreateTopicPage} />
    </Switch>
  </div>
)

export default AuthorizedLayout
