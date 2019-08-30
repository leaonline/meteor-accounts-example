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

  oauth2server.authenticatedRoute().get('/account', function (req, res, next) {
    const user = Meteor.users.findOne(req.user.id)

    res.send({
      id: user._id,
      name: user.name
    })
  })
})

Meteor.methods({
  'registerClient' ({ title, homepage, description, privacyLink, redirectUris, grants }) {
    return oauth2server.registerClient({ title, homepage, description, privacyLink, redirectUris, grants })
  }
})
