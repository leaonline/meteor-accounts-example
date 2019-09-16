/* global ServiceConfiguration Meteor */

Meteor.methods({
  'addAuthClient' ({ title, clientId, secret, dialogUrl, redirectUrl }) {
    ServiceConfiguration.configurations.upsert(
      { service: 'lea' },
      {
        $set: {
          loginStyle: 'popup',
          clientId,
          secret,
          dialogUrl,
          redirectUrl: '' //Meteor.settings.public.oauth.lea.redirectUrl
        }
      }
    )
  }
})
