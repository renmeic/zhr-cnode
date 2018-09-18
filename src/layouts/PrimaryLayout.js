import React from 'react'
import {Route} from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import HomePage from '../pages/HomePage'
import TopicPage from '../pages/TopicPage'
import UserProfilePage from '../pages/UserProfilePage'

// Sub Layouts
import UserSubLayout from './UserSubLayout'
import ProductSubLayout from './ProductSubLayout'

const PrimaryLayout = ({ match }) => (
  <div className="primary-layout">
    <Header />
    <main className='main'>
      <Route path='/' exact component={HomePage} />
      <Route path='/topic/:topic_id' exact component={TopicPage} />
      <Route path='/users/:user_id' exact component={UserProfilePage} />
    </main>
    <Footer/>
  </div>
)

export default PrimaryLayout
