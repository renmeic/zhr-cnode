import React from 'react'
import { Switch, Route, NavLink } from 'react-router-dom'
import UserNav from '../ui/UserNav'

// Sub Layouts
import BrowseUsersPage from '../pages/BrowseUsersPage'
import AddUsersPage from '../pages/AddUsersPage'
import UserProfilePage from '../pages/UserProfilePage'

const UserSubLayout = ({ match }) => (
  <div className="user-sub-layout">
    <aside>
      <UserNav />
    </aside>
    <div className="primary-content">
      <Switch>
        <Route path={match.path} exact component={BrowseUsersPage} />
        <Route path={`${match.path}/add`} exact component={AddUsersPage} />
        <Route path={`${match.path}/:userId`}  component={UserProfilePage} />
      </Switch>
    </div>
  </div>
)

export default UserSubLayout
