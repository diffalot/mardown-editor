import angular from 'angular'
import uirouter from 'angular-ui-router'

import routing from './editor.routes'
import EditorController from './editor.controller'

import hcMarked from 'angular-marked'

export default angular.module('editor', [
  uirouter,
  hcMarked
])
  .config(routing)
  .controller('EditorController', EditorController)
  .name
