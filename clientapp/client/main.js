import { Template } from 'meteor/templating'
import { ReactiveVar } from 'meteor/reactive-var'

import './main.html'

Template.registerHelper('stringify', function (obj) {
  return obj && JSON.stringify(obj, null, 2)
})

Tracker.autorun(() => {
  console.log(Accounts.loginServicesConfigured())
})

Template.logout.events({
  'click .logoutButton' (event, instance) {
    event.preventDefault()
    Meteor.logout(err => console.error(err))
  },
})

Template.login.events({
  'click .loginButton' (event, instance) {
    event.preventDefault()
    Meteor.loginWithLea({}, (err, res) => {
      console.log(err, res)
    })
  },
})
