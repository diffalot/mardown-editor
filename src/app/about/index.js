import angular from 'angular'
import uirouter from 'angular-ui-router'

import routing from './about.routes'
import AboutController from './about.controller'

import hcMarked from 'angular-marked'

export default angular.module('about', [
  uirouter,
  hcMarked
])
  .config(routing)
  .controller('AboutController', AboutController)
  .name
