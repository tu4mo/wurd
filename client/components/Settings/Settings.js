import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { propTypes as reduxFormPropTypes, reduxForm } from 'redux-form'
import { fetchAccount, saveAccount } from '~/actions/account'
import { authenticateUser } from '~/actions/auth'
import { getAccount } from '~/selectors/account'
import Alert from '../Alert'
import { Box, BoxSection } from '../Box'
import Button from '../Button'
import FormControl from '../FormControl'
import Spacer from '../Spacer'
import './Settings.scss'

class Settings extends Component {
  static propTypes = {
    ...reduxFormPropTypes,
    accountError: PropTypes.string,
    authenticateUser: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.props.fetchAccount()
  }

  submit = values => {
    this.props.saveAccount(values, account => {
      this.props.authenticateUser()
      this.props.history.push(`/${account.username}`)
    })
  }

  render() {
    const {
      accountError,
      handleSubmit,
      invalid,
      isSaving,
      pristine,
      submitting
    } = this.props

    return (
      <div className="settings">
        <div className="container">
          <Box className="settings__content">
            <form onSubmit={handleSubmit(this.submit)}>
              <BoxSection hasPadding>
                <Spacer>
                  {accountError && <Alert message={accountError} />}
                  <FormControl color="gray" label="Username" name="username" />
                  <FormControl color="gray" label="Email" name="email" />
                  <FormControl
                    color="gray"
                    label="Current Password"
                    name="currentPassword"
                    type="password"
                  />
                  <FormControl
                    color="gray"
                    label="New Password"
                    name="password"
                    type="password"
                  />
                </Spacer>
              </BoxSection>
              <BoxSection hasPadding>
                <Button
                  disabled={invalid || pristine || submitting || isSaving}
                  loading={isSaving}
                  type="submit"
                >
                  Save
                </Button>
              </BoxSection>
            </form>
          </Box>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const account = getAccount(state)

  return {
    accountError: account.error,
    initialValues: {
      ...account
    },
    isSaving: account.isSaving
  }
}

const validate = values => {
  const errors = {}

  if (!values.username) {
    errors.username = 'Required'
  }

  if (!values.email) {
    errors.email = 'Required'
  }

  if (!values.currentPassword) {
    errors.currentPassword = 'Required'
  }

  return errors
}

export default connect(mapStateToProps, {
  authenticateUser,
  fetchAccount,
  saveAccount
})(
  reduxForm({
    form: 'settings',
    validate
  })(Settings)
)
