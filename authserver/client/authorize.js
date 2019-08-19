import { Template } from 'meteor/templating'

// Subscribe the list of already authorized clients
// to auto accept
Template.authorize.onCreated(function () {
  const instance = this
  instance.state = new ReactiveDict()
  instance.autorun(() => {
    const sub = instance.subscribe('authorizedOAuth')
    instance.state.set('authorizedSubReady', sub.ready())
  })
})

// Get the login token to pass to oauth
// This is the best way to identify the logged user
Template.authorize.helpers({
  loadComplete() {
    const instance = Template.instance()
    return instance.state.get('authorizedSubReady')
  },
  getToken: function () {
    return localStorage.getItem('Meteor.loginToken')
  }
})

// Auto click the submit/accept button if user already
// accepted this client
Template.authorize.onRendered(function () {
  var data = this.data
  this.autorun(function (c) {
    var user = Meteor.user()
    console.log(user)
    if (user && user.oauth && user.oauth.authorizedClients && user.oauth.authorizedClients.indexOf(data.client_id()) > -1) {
      c.stop()
      $('button').click()
    }
  })
})

