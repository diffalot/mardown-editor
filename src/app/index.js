import '../styles/main.scss'

import angular from 'angular'
import uirouter from 'angular-ui-router'

import config from './app.config'
import routing from './app.routes'

import AppController from './app.controller'
import title from './app.title'

import about from './about'

angular.module('AngularWebpack', [
  uirouter,
  about
])
.controller('AppController', AppController)
.config(config)
.config(routing)
.run(title)
