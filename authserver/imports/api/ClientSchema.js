const grants = [ { value: 'authorization_code', label: 'Authorization Code' } ]

export const ClientSchema = {
  title: String,
  homepage: String,
  description: {
    type: String,
    optional: true
  },
  privacyLink: {
    type: String,
    optional: true
  },
  redirectUris: {
    type: Array,
    min: 1
  },
  'redirectUris.$': {
    type: String
  },
  grants: {
    type: Array,
    min: 1,
    defaultValue: [ 'authorization_code' ],
    autoform: {
      type: 'select-checkbox',
      options () {
        return grants
      }
    }
  },
  'grants.$': {
    type: String
  }
}
