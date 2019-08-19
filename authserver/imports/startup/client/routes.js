import { FlowRouter } from 'meteor/ostrio:flow-router-extra'
import { Routes } from '../../api/Routes'

Routes.each(route => {
  FlowRouter.route(route.path(), {
    waitOn: route.include,
    action: function (params, queryParams) {
      this.render('layout', route.template, queryParams)
    }
  })
})
