export default function routes ($stateProvider) {
  'ngInject'
  $stateProvider
  .state('editor', {
    data: { pageTitle: 'Editor' },
    url: '/',
    parent: 'default',
    template: require('./editor.template.html'),
    controller: 'EditorController',
    controllerAs: 'editor'
  })
}
