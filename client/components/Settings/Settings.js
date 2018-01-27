import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm, propTypes as reduxFormPropTypes } from 'redux-form'
import NavigationPrompt from 'react-router-navigation-prompt'
import styled from 'styled-components'

import { fetchAccount, saveAccount } from '../../ducks/account'
import { authenticateUser } from '../../ducks/auth'
import { getAccount } from '../../selectors/account'

import Alert from '../Alert'
import Box from '../Box'
import BoxSection from '../BoxSection'
import Button from '../Button'
import Container from '../Container'
import Dialog from '../Dialog'
import FormControl from '../FormControl'
import Modal from '../Modal'
import Spacer from '../Spacer'

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

  submit = values =>
    this.props.saveAccount(values).then(account => {
      this.props.authenticateUser()
      this.props.history.push(`/${account.username}`)
    })

  render() {
    const {
      accountError,
      className,
      dirty,
      handleSubmit,
      invalid,
      isSaving,
      pristine,
      submitting
    } = this.props

    return (
      <div className={className}>
        <Container>
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
        </Container>
        <NavigationPrompt when={dirty && !submitting}>
          {({ onCancel, onConfirm }) => (
            <Modal>
              <Dialog onCancel={onCancel} onConfirm={onConfirm}>
                Do you want to leave without saving?
              </Dialog>
            </Modal>
          )}
        </NavigationPrompt>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { email, error, isSaving, username } = getAccount(state)

  return {
    accountError: error,
    initialValues: {
      email,
      username
    },
    isSaving: isSaving
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

const StyledSettings = styled(Settings)`
  border-top: 1px solid var(--color-ultra-light-gray);
  padding-bottom: var(--spacing-responsive-md);
  padding-top: var(--spacing-responsive-md);

  .settings__content {
    margin: 0 auto;
    max-width: 640px;
  }
`

export default connect(mapStateToProps, {
  authenticateUser,
  fetchAccount,
  saveAccount
})(
  reduxForm({
    form: 'settings',
    validate
  })(StyledSettings)
)
