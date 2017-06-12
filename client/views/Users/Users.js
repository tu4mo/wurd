import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from '../../actions/users'
import { getUsers } from '../../selectors/users'
import UserList from '../../components/UserList'
import './Users.scss'

class Users extends Component {
  componentDidMount() {
    this.props.fetchUsers()
  }

  render() {
    return (
      <div className="users">
        <div className="container">
          <UserList users={this.props.users} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const users = getUsers(state)

  console.log(users)

  return {
    users
  }
}

export default connect(mapStateToProps, { fetchUsers })(Users)
