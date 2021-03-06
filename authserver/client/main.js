import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import '../imports/startup/client/routes'
import '../imports/ui/nav/nav'
import '../imports/ui/logout/logout'
import './main.html'

AutoForm.setDefaultTemplate('bootstrap4')

Template.registerHelper('stringify', function (obj) {
  return obj && JSON.stringify(obj)
})