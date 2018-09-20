import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import HomePage from '../pages/HomePage'
import TopicPage from '../pages/TopicPage'
import UserProfilePage from '../pages/UserProfilePage'
import CollectionsPage from '../pages/CollectionsPage'

import AuthorizedRoute from '../AuthorizedRoute'

// Sub Layouts
/*import UserSubLayout from './UserSubLayout'
import ProductSubLayout from './ProductSubLayout'*/
import UnauthorizedLayout from './UnauthorizedLayout'
import AuthorizedLayout from './AuthorizedLayout'

class PrimaryLayout extends React.Component {
  componentDidUpdate() {
    this.props.location.state = this.props.userinfo
  }
  render() {
    return (
      <div className="primary-layout">
        <Header />
        <main className='main'>
          <Switch>
            <Route path='/' exact component={HomePage} />
            <Route path="/auth" component={UnauthorizedLayout} />
            <Route path='/topics/:topic_id' component={TopicPage} />
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
