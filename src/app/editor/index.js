import angular from 'angular'
import uirouter from 'angular-ui-router'
global.CodeMirror = require('codemirror')
require('angular-ui-codemirror')
import '../../../node_modules/codemirror/lib/codemirror.css'
import ngdialog from 'ng-dialog'

import routing from './editor.routes'
import EditorController from './editor.controller'

import hcMarked from 'angular-marked'

export default angular.module('editor', [
  uirouter,
  hcMarked,
  'ui.codemirror',
  ngdialog.name
])
  .config(routing)
  .controller('EditorController', EditorController)
  .name
