export default class EditorController {
  constructor ($scope, $timeout, ngDialog) {
    'ngInject'
    var self = this
    self.editor
    self.markdown = '# markdown'
    self.codemirrorOptions = {
      mode: 'markdown',
      theme: 'default',
      lineWrapping: true,
      viewportMargin: Infinity
    }
    self.editorLoaded = function (editor) {
      self.editor = editor
      $timeout(function () {
        editor.refresh()
      }, 0)
    }
    self.toggleHelp = function () {
      self.helpOpen = !self.helpOpen
    }
    function getEditorSelection () {
      if (self.editor && self.editor.doc) {
        return self.editor.doc.getSelection()
      } else {
        return false
      }
    }

    function insertIntoEditor (text) {
      if (self.editor && self.editor.doc) {
        return self.editor.doc.replaceSelection(text)
      }
    }

    function focusEditor () {
      var s = self.editor.getValue()
      if (s === '') {
        self.Editor.setValue('.')
      }
      self.editor.focus()
      if (s === '') {
        self.editor.setValue('')
      }
    }

    self.makeBold = function () {
      var selection = getEditorSelection()
      if (selection) {
        insertIntoEditor('**' + selection + '**')
      } else {
        insertIntoEditor('**Bold**')
      }
      focusEditor()
    }

    self.makeItalic = function () {
      var selection = getEditorSelection()
      if (selection) {
        insertIntoEditor('*' + selection + '*')
      } else {
        insertIntoEditor('*Italic*')
      }
      focusEditor()
    }

    function selectWholeLines () {
      var beginning = self.editor.doc.getCursor(true)
      beginning.ch = 0
      var end = self.editor.doc.getCursor(false)
      end.ch = self.editor.doc.getLine(end.line).length
      self.editor.doc.setSelection(beginning, end)
    }

    self.makeBulletedList = function () {
      var selection = getEditorSelection()
      if (selection) {
        selectWholeLines()
        selection = getEditorSelection()
        var lines = selection.split('\n')
        for (var i = 0; i < lines.length; i++) {
          lines[i] = '* ' + lines[i]
        }
        insertIntoEditor(lines.join('\n'))
      } else {
        insertIntoEditor('* Item\n* Item\n* Item\n\n')
      }
      focusEditor()
    }

    self.makeNumberedList = function () {
      var selection = getEditorSelection()
      if (selection) {
        selectWholeLines()
        selection = getEditorSelection()
        var lines = selection.split('\n')
        for (var i = 0; i < lines.length; i++) {
          lines[i] = (i + 1) + '. ' + lines[i]
        }
        insertIntoEditor(lines.join('\n'))
      } else {
        insertIntoEditor('1. Item\n1. Item\n1. Item\n\n')
      }
      focusEditor()
    }

    self.makeQuote = function () {
      var selection = getEditorSelection()
      if (selection) {
        selectWholeLines()
        selection = getEditorSelection()
        var lines = selection.split('\n')
        for (var i = 0; i < lines.length; i++) {
          lines[i] = '> ' + lines[i]
        }
        insertIntoEditor('\n' + lines.join('\n'))
      } else {
        insertIntoEditor('\n> Lines\n> of\n> text\n\n')
      }
      focusEditor()
    }

    self.makeLink = function () {
      var link = {
        text: getEditorSelection() || 'Link text',
        uri: 'http://example.com'
      }

      var dialog = ngDialog.open({
        template: 'app/editor/modal.link.template.html',
        className: 'ngdialog-theme-plain',
        scope: $scope,
        data: link,
        controller: function ($scope) {
          $scope.link = $scope.ngDialogData
        }
      })

      dialog.closePromise.then(function (result) {
        if (result.value && result.value !== 'cancel' && result.value !== '$closeButton' && result.value !== '$document') {
          insertIntoEditor('[' + link.text + '](' + link.uri + ')')
        }
        focusEditor()
      })
    }

    self.makeImage = function () {
      var image = {
        uri: 'http://i.imgur.com/b18tMGT.gif'
      }

      var dialog = ngDialog.open({
        template: 'app/editor/modal.image.template.html',
        className: 'ngdialog-theme-plain',
        scope: $scope,
        data: image,
        controller: function ($scope) {
          $scope.image = $scope.ngDialogData
        }
      })

      dialog.closePromise.then(function (result) {
        if (result.value && result.value !== 'cancel' && result.value !== '$closeButton' && result.value !== '$document') {
          insertIntoEditor('![](' + image.uri + ')')
        }
        focusEditor()
      })
    }
    console.log('editor controller', self)
  }
}
