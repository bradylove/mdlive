@App.directive 'ace', ($timeout) ->
  resizeEditor = (editor, elem) ->
    lineHeight = editor.renderer.lineHeight
    rows = editor.getSession().getLength()

    editor.resize()

  return {
    restrict: 'A'
    require: '?ngModel'
    scope: true
    link: (scope, elem, attrs, ngModel) ->
      node   = elem[0]
      editor = ace.edit(node)

      editor.setTheme('ace/theme/eclipse')

      MarkdownMode = ace.require('ace/mode/markdown').Mode
      session = editor.getSession()
      session.setMode(new MarkdownMode())
      session.setUseWrapMode(true)
      session.setUseSoftTabs(true)
      editor.setShowPrintMargin(true);

      $(elem).height("100%")
      $(elem).width("100%")
      editor.resize()

      # data binding to ngModel
      ngModel.$render = ->
        editor.setValue(ngModel.$viewValue)

      editor.on 'change', ->
        # scope.$apply ->
        value = editor.getValue()
        ngModel.$setViewValue(value)
  }
