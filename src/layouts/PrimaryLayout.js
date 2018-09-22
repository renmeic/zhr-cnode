import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import HomePage from '../pages/HomePage'
import TopicPage from '../pages/TopicPage'
import UserProfilePage from '../pages/UserProfilePage'
import CollectionsPage from '../pages/CollectionsPage'

import AuthorizedRoute from '../AuthorizedRoute'

// Sub Layouts
import UnauthorizedLayout from './UnauthorizedLayout'
import AuthorizedLayout from './AuthorizedLayout'

class PrimaryLayout extends React.Component {
  render() {
    // console.log(this.props.userinfo)
    return (
      <div className="primary-layout">
        <Header logged={this.props.logged}/>
        <main className='main'>
          {this.props.location.pathname!=='/auth/login' && <Sidebar userinfo={this.props.userinfo}/>}
          <Switch>
            <Route path='/' exact component={HomePage} />
            <Route path="/auth" component={UnauthorizedLayout} />
            <Route path='/topics/:topic_id' exact component={TopicPage} />
            <Route path='/users/:user_id' exact component={UserProfilePage} />
            <Route path='/users/:user_id/collections' exact component={CollectionsPage} />
            <AuthorizedRoute component={AuthorizedLayout} />
          </Switch>
        </main>
        <Footer/>
      </div>
    )
  }
}

export default PrimaryLayout
