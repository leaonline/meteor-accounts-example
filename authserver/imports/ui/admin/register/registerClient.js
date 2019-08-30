import { ClientSchema } from '../../../api/ClientSchema'
import { Schema } from '../../../api/schema'
import { formIsValid, formReset } from '../../utils/formIsUtils'
import './registerClient.html'

const registerClientSchema = Schema.create(ClientSchema)

Template.registerClient.onCreated(function () {
  const instance = this
  instance.state = new ReactiveDict()
})

Template.registerClient.helpers({
  registerClientSchema () {
    return registerClientSchema
  },
  registeredClient () {
    return Template.instance().state.get('registeredClient')
  }
})

Template.registerClient.events({
  'submit #registerClientForm' (event, templateInstance) {
    event.preventDefault()
    const insertDoc = formIsValid('registerClientForm', registerClientSchema)
    Meteor.call('registerClient', insertDoc, (err, registeredClient) => {
      formReset('registerClient')
      if (err) {
        alert(err.message)
      } else {
        templateInstance.state.set('registeredClient', registeredClient)
      }
    })
  },
  'click .remove-registered' (event, templateInstance) {
    event.preventDefault()
    templateInstance.state.set('registeredClient', null)
  }
})
