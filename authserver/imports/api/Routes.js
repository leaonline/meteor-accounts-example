import { Meteor } from 'meteor/meteor'

const settings = Meteor.settings.public.oauth

export const Routes = {}

const _routes = {}
_routes.root = {
  template: 'overview',
  path: () => '/',
  label: 'Overview',
  isPage: true,
  include () {
    return import('../ui/overview/overview')
  }
}

_routes.createUser = {
  template: 'createUser',
  path: () => '/createUser',
  label: 'Create new user',
  isPage: true,
  include () {
    return import('../ui/admin/create/createUser')
  }
}

_routes.authorize = {
  template: 'authorize',
  path: () => settings.dialogUrl,
  label: 'Authorize',
  isPage: true,
  include () {
    return import('../ui/oauth/authorize/authorize')
  },
  layout: 'authLayout'
}

Routes.all = function () {
  return Object.assign({}, _routes)
}

Routes.each = function (fn) {
  Routes.toArray().forEach(fn)
}

Routes.toArray = function () {
  const all = Routes.all()
  return Object.values(all)
}

Object.assign(Routes, _routes)
