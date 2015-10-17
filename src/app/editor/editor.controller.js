export default class EditorController {
  constructor () {
    'ngInject'
    var self = this
    console.log('editor controller', self)
    self.about = require('../../../README.md')
  }
}
