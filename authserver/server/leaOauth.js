import { Meteor } from 'meteor/meteor'
import { OAuth2Server } from 'meteor/leaonline:oauth2-server'

let oauth2server

Meteor.startup(() => {
  oauth2server = new OAuth2Server({
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

  oauth2server.authenticatedRoute().get('/oauth/ident', function (req, res, next) {
    console.log('secret route', req.data)
    const user = Meteor.users.findOne(req.data.user.id)

    res.writeHead(200, {
      'Content-Type': 'application/json',
    })
    const body = JSON.stringify({
      id: user._id,
      name: user.username
    })
    res.end(body)
  })
})

Meteor.methods({
  'registerClient' ({ title, homepage, description, privacyLink, redirectUris, grants }) {
    return oauth2server.registerClient({ title, homepage, description, privacyLink, redirectUris, grants })
  }
})
