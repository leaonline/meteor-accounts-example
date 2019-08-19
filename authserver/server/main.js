import { Meteor } from 'meteor/meteor'
import { Schema } from '../imports/api/schema'

import { oauth2server } from './leaOauth'

const validateNewUserSchema = Schema.create({
  _id: { type: String },
  username: String,
  emails: { type: Array },
  'emails.$': { type: Object },
  'emails.$.address': { type: String },
  'emails.$.verified': { type: Boolean },
  createdAt: { type: Date },
  services: { type: Object, blackbox: true }
})
// Ensuring every user has an email address, should be in server-side code
Accounts.validateNewUser((user) => {
  // validateNewUserSchema.validate(user)
  // Return true to allow user creation to proceed
  return true
})

Meteor.users.deny({
  insert () { return true },
  update () { return true },
  remove () { return true },
})

const createUserSchema = Schema.create({
  username: String,
  email: String,
  password: String
})

Meteor.methods({
  'createNewUser' ({ username, email, password }) {
    return Accounts.createUser({ username, email, password })
  },
  'generateAuthCode' ({ clientId }) {
    const userId = this.userId
    if (!userId) throw new Meteor.Error('403', 'permission denied', 'you have to login to obtain an auth code')

    const code = oauth2server.mode.generateAuthorizationCode()
    console.log(code)
  }
})