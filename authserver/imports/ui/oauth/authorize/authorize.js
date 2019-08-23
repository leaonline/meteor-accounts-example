import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'
import { ReactiveDict } from 'meteor/reactive-dict'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra'
import { Random } from 'meteor/random'
import '../../login/login'
import './authorize.html'

// make redirect url available via settings
// see https://www.oauth.com/oauth2-servers/redirect-uris/redirect-uri-registration/
const settings = Meteor.settings.public.oauth
const authorizedClientsSub = Meteor.subscribe('authorizedOAuth')

// Subscribe the list of already authorized clients
// to auto accept
Template.authorize.onCreated(function () {
  const instance = this
  instance.state = new ReactiveDict()

  // check params against our definitions
  // https://www.oauth.com/oauth2-servers/authorization/the-authorization-request/
  instance.autorun(() => {
    const redirectUri = FlowRouter.getQueryParam('redirect_uri')
    const clientId = FlowRouter.getQueryParam('client_id')

    if (redirectUri !== settings.redirectUrl || clientId !== settings.clientApp) {
      console.log(redirectUri, settings.redirectUrl)
      console.log(clientId, settings.clientApp)
      const message = 'invalid redirect url or client app id'
      instance.state.set('errors', [ { message } ])
    }

    const scope = FlowRouter.getQueryParam('scope')
    instance.state.set('scope', scope && scope.split('+'))
  })

  // subscription
  instance.autorun(() => {
    instance.state.set('authorizedSubReady', authorizedClientsSub.ready())
    console.log(authorizedClientsSub.ready())
  })
})

Template.authorize.helpers({
  loadComplete () {
    const instance = Template.instance()
    return instance.state.get('authorizedSubReady')
  },
  getToken: function () {
    return window.localStorage.getItem('Meteor.loginToken')
  },
  redirectUrl () {
    return settings.redirectUrl
  },
  errors () {
    const errors = Template.instance().state.get('errors')
    return errors && errors.length > 0 && errors
  },
  requestedResources () {
    return Template.instance().state.get('scope')
  },
  code () {
    return Template.instance().state.get('authorization_code')
  }
})

// Auto click the submit/accept button if user already
// accepted this client
Template.authorize.onRendered(function () {
  var data = this.data
  this.autorun(function (c) {
    var user = Meteor.user()
    console.log("user", user)
    if (user && user.oauth && user.oauth.authorizedClients && user.oauth.authorizedClients.indexOf(data.client_id()) > -1) {
      c.stop()
      window.$('button').click()
    }
  })
})
