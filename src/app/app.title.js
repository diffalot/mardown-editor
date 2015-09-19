export default function title ($rootScope, $state, $stateParams) {
  'ngInject'
  $rootScope.$state = $state
  $rootScope.$stateParams = $stateParams
}
