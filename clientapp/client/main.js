/* global Accounts */
import { Template } from 'meteor/templating'
import { Tracker } from 'meteor/tracker'
import { Meteor } from 'meteor/meteor'

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
