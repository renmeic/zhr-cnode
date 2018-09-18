import React from 'react'

class UserProfilePage extends React.Component {
  render() {
    return (
      <div>
        User Profile for user: {this.props.match.params.user_id}
      </div>
    )
  }
}

export default UserProfilePage
