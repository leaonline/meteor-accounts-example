import { Template } from 'meteor/templating'
import './nav.html'

import { Routes } from '../../api/Routes'

const routes = Routes.toArray().filter(route => route.isPage).map(route => {
  return {
    value: route.path(),
    label: route.label
  }
})

Template.nav.helpers({
  routes () {
    return routes
  }
})
