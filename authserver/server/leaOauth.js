import { Meteor } from 'meteor/meteor'
import { OAuth2Server } from 'meteor/leaonline:oauth2-server'

export const oauth2server = new OAuth2Server({
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
  }
})

// Add a route to return account information
oauth2server.authenticatedRoute('/oauth/account', function (req, res, next) {
  var user = Meteor.users.findOne(req.user.id)

  res.send({
    id: user._id,
    name: user.name
  })
})

oauth2server.app.use('*', function (req, res, next) {
  res.writeHead(404)
  res.end('route not found')
})
