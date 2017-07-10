import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { propTypes as reduxFormPropTypes, reduxForm } from 'redux-form'
import { fetchAccount, saveAccount } from '~/actions/account'
import { getAccount } from '~/selectors/account'
import Alert from '../Alert'
import Button from '../Button'
import FormControl from '../FormControl'
import Spacer from '../Spacer'
import './Settings.scss'

class Settings extends Component {
  static propTypes = {
    ...reduxFormPropTypes,
    accountError: PropTypes.string,
    history: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.props.fetchAccount()
  }

  submit = values => {
    this.props.saveAccount(values, account => {
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
      <div className="settings container">
        <form
          className="settings__content"
          onSubmit={handleSubmit(this.submit)}
        >
          <Spacer>
            {accountError && <Alert message={accountError} />}
            <FormControl label="Username" name="username" />
            <FormControl label="Email" name="email" />
            <FormControl
              label="Current Password"
              name="currentPassword"
              type="password"
            />
            <FormControl label="New Password" name="password" type="password" />
            <Button
              disabled={invalid || pristine || submitting || isSaving}
              loading={isSaving}
              type="submit"
            >
              Save
            </Button>
          </Spacer>
        </form>
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

export default connect(mapStateToProps, { fetchAccount, saveAccount })(
  reduxForm({
    form: 'settings',
    validate
  })(Settings)
)
