/* global Accounts */
import { Template } from 'meteor/templating'
import { Tracker } from 'meteor/tracker'
import { Meteor } from 'meteor/meteor'
import { ReactiveDict } from 'meteor/reactive-dict'
import SimpleSchema from 'simpl-schema'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import './main.html'

Template.registerHelper('stringify', function (obj) {
  return obj && JSON.stringify(obj, null, 2)
})

Tracker.autorun(() => {
  console.log('services configured: ', Accounts.loginServicesConfigured())
})

Template.logout.events({
  'click .logoutButton' (event, instance) {
    event.preventDefault()
    Meteor.logout(err => console.error(err))
  }
})

Template.login.events({
  'click .loginButton' (event, instance) {
    event.preventDefault()
    Meteor.loginWithLea({}, (err, res) => {
      console.log(err, res)
    })
  }
})

const registerSchema = new SimpleSchema({
  clientId: String,
  secret: String,
  dialogUrl: String
}, { tracker: Tracker })

Template.register.onCreated(function () {
  const instance = this
  instance.state = new ReactiveDict()
})

Template.register.helpers({
  registerSchema () {
    return registerSchema
  },
  registerForm () {
    return Template.instance().state.get('registerForm')
  },
  redirectUrl () {
    return Meteor.settings.public.oauth.lea.redirectUrl
  }
})

Template.register.events({
  'click .register-button' (event, templateInstance) {
    event.preventDefault()
    templateInstance.state.set('registerForm', true)
  },
  'submit #registerForm' (event, templateInstance) {
    event.preventDefault()
    const insertDoc = AutoForm.getFormValues('registerForm').insertDoc

    Meteor.call('addAuthClient', insertDoc, (err, res) => {
      if (err) {
        console.error(err)
        alert('fail, see browser console')
      } else {
        alert('registered successfully')
        templateInstance.state.set('registerForm', false)
      }
    })
  }
})