import { Schema } from '../../../api/schema'
import './createUser.html'

const createUserSchema = Schema.create({
  username: String,
  email: String,
  password: {
    type: String,
    autoform: {
      type: 'password'
    }
  }
})

Template.createUser.onCreated(function () {
  const instance = this
  instance.state = new ReactiveDict()
})

Template.createUser.helpers({
  createUserSchema () {
    return createUserSchema
  },
  errors () {
    return Template.instance().state.get('errors')
  }
})

Template.createUser.events({
  'submit #createUserForm' (event, templateInstance) {
    event.preventDefault()

    const createUserFormValues = AutoForm.getFormValues('createUserForm')
    const { insertDoc } = createUserFormValues
    const errors = createUserSchema.validate(insertDoc)
    if (errors && errors.length > 0) {
      templateInstance.state.set('errors', errors)
      return
    } else {
      templateInstance.state.set('errors', null)
    }

    const {username} = insertDoc
    const {email} = insertDoc
    const {password} = insertDoc
    Meteor.call('createNewUser', { username, email, password }, (err, res) => {
      if (err) {
        return templateInstance.state.set('errors', [ err ])
      }
      if (res) {
        alert('user created')
        AutoForm.resetForm('createUserForm')
      }
    })
  }
})