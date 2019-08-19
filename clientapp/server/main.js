/* global ServiceConfiguration */
import { Meteor } from 'meteor/meteor'

const settings = Meteor.settings.oauth.lea

Meteor.startup(() => {
  ServiceConfiguration.configurations.upsert(
    { service: 'lea' },
    {
      $set: {
        loginStyle: 'popup',
        clientId: settings.clientApp, // See table below for correct property name!
        secret: settings.secret,
        dialogUrl: settings.dialogUrl,
        redirectUrl: settings.redirectUrl
      }
    }
  )
})
