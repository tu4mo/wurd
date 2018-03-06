import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { fetchUsers } from '../../ducks/users'
import { getUsers, isUsersPending } from '../../selectors/users'

// Import components
import Container from '../../components/Container'
import Head from '../../components/Head'
import UserList from '../../components/UserList'

class Users extends Component {
  static propTypes = {
    fetchUsers: PropTypes.func.isRequired,
    isPending: PropTypes.bool.isRequired,
    users: PropTypes.array.isRequired
  }

  componentDidMount() {
    this.props.fetchUsers()
  }

  render() {
    const { isPending, users } = this.props

    return (
      <Container withYPadding>
        <Head>
          <title>Users</title>
        </Head>
        <UserList isPending={isPending} users={users} />
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  isPending: isUsersPending(state),
  users: getUsers(state)
})

export default connect(mapStateToProps, { fetchUsers })(Users)
