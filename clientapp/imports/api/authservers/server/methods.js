/* global ServiceConfiguration Meteor */

Meteor.methods({
  'addAuthClient' ({ title, clientId, secret, dialogUrl, accessTokenUrl, identityUrl }) {
    ServiceConfiguration.configurations.upsert(
      { service: 'lea' },
      {
        $set: {
          loginStyle: 'popup',
          clientId,
          secret,
          dialogUrl,
          accessTokenUrl,
          identityUrl,
          redirectUrl: Meteor.settings.public.oauth.lea.redirectUrl
        }
      }
    )
  }
})
