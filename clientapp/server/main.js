import { Meteor } from 'meteor/meteor'

const settings = Meteor.settings.oauth.lea

Meteor.startup(() => {
  ServiceConfiguration.configurations.upsert(
    { service: 'lea' },
    {
      $set: {
        loginStyle: 'popup',
        appId: settings.clientApp, // See table below for correct property name!
        secret: settings.secret,
        dialogUrl: settings.dialogUrl,
        redirectUri: settings.redirectUri
      }
    }
  )
})
