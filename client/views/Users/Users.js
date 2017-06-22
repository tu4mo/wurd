import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchUsers } from '~/actions/users'
import { getUsers } from '~/selectors/users'
import UserList from '~/components/UserList'
import './Users.scss'

class Users extends Component {
  static propTypes = {
    fetchUsers: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.props.fetchUsers()
  }

  render() {
    const { users } = this.props

    return (
      <div className="users">
        <div className="container">
          <UserList isPending={users.isPending} users={users.data} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: getUsers(state)
})

export default connect(mapStateToProps, { fetchUsers })(Users)
