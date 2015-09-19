export default function config ($urlRouterProvider, $locationProvider) {
  'ngInject'
  $locationProvider.html5Mode(false)
  $urlRouterProvider.otherwise('/about')
}
