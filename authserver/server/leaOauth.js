import { Meteor } from 'meteor/meteor'
import { OAuth2Server } from 'meteor/leaonline:oauth2-server'

const settings = Meteor.settings.oauth

Meteor.startup(() => {
  const oauth2server = new OAuth2Server({
    serverOptions: {
      addAcceptedScopesHeader: true,
      addAuthorizedScopesHeader: true,
      allowBearerTokensInQueryString: false,
      allowEmptyState: false,
      authorizationCodeLifetime: 300,
      accessTokenLifetime: 3600,
      refreshTokenLifetime: 1209600,
      allowExtendedTokenAttributes: false,
      requireClientAuthentication: true
    },
    model: {
      accessTokensCollectionName: 'oauth_access_tokens',
      refreshTokensCollectionName: 'oauth_refresh_tokens',
      clientsCollectionName: 'oauth_clients',
      authCodesCollectionName: 'oauth_auth_codes',
      debug: true
    },
    routes: {
      accessTokenUrl: '/oauth/token',
      authorizeUrl: '/oauth/authorize',
      errorUrl: '/oauth/error',
      fallbackUrl: '/oauth/*'
    },
    debug: true
  })


  oauth2server.registerClient({
    title: 'my client app',
    secret: 'supersecret1234',
    clientApp: 'clientAppId1234',
    redirectUris: [ 'http://localhost:4000/_oauth/lea' ]
  })
})

/*
oauth2server.app.use('')

// Add a route to return account information
oauth2server.authenticatedRoute('/oauth/account', function (req, res, next) {
  var user = Meteor.users.findOne(req.user.id)

  res.send({
    id: user._id,
    name: user.name
  })
})
*/