import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import './authorize.html'
import './authorize'
import './login.html'
import './login'
import './logout.html'
import './logout'
import './createUser.html'
import './createUser'
import './main.html'

import { FlowRouter } from 'meteor/ostrio:flow-router-extra'

const settings = Meteor.settings.public.oauth

// Define the route to render the popup view
FlowRouter.route(settings.dialogUrl, {
  action: function (params, queryParams) {
    this.render('layout', 'authorize', queryParams)
  }
})

// Define the route to render the popup view
FlowRouter.route('/createUser', {
  action: function (params, queryParams) {
    this.render('layout', 'createUser', queryParams)
  }
})
