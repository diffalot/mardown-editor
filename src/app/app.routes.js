export default function routes ($stateProvider) {
  'ngInject'
  $stateProvider
  .state('default', {
    url: '',
    abstract: true,
    template: require('./app.template.html'),
    controller: 'AppController',
    controllerAs: 'App'
  })
}
