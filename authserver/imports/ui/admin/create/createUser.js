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
  },
  firstName: {
    type: String,
    optional: true
  },
  lastName: {
    type: String,
    optional: true
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

    Meteor.call('createNewUser', insertDoc, (err, res) => {
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
