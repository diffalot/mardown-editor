export default class AboutController {
  constructor () {
    'ngInject'
    var self = this
    console.log('about controller', self)
    self.about = require('../../../README.md')
  }
}
