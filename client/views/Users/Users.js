import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { fetchUsers } from '../../actions/users'
import { getUsers } from '../../selectors/users'

// Import components
import Container from '../../components/Container'
import Head from '../../components/Head'
import UserList from '../../components/UserList'

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
      <Container withYPadding>
        <Head>
          <title>Users</title>
        </Head>
        <UserList isPending={users.isPending} users={users.data} />
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  users: getUsers(state)
})

export default connect(mapStateToProps, { fetchUsers })(Users)
