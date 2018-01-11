import { Selector } from 'testcafe'

require('dotenv').config()

const { TEST_EMAIL, TEST_PASSWORD, TEST_USERNAME } = process.env

fixture('Welcome Page').page('http://localhost:8080')

test('Log In', async t => {
  await t
    .typeText('#input-email', TEST_EMAIL)
    .typeText('#input-password', TEST_PASSWORD)
    .click('button[type=submit]')
    .expect(
      Selector('.header__profile')
        .find('img')
        .getAttribute('title')
    )
    .eql(TEST_USERNAME)
})
