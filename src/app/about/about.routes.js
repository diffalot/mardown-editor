export default function routes ($stateProvider) {
  'ngInject'
  $stateProvider
  .state('about', {
    data: { pageTitle: 'About' },
    url: '/about',
    parent: 'default',
    template: require('./about.template.html'),
    controller: 'AboutController',
    controllerAs: 'about'
  })
}
