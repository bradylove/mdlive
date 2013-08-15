@App = angular.module("App", ['ngSanitize'])

@App.factory "Files", ->
  factory =
    activeFile: null
    files:
      [{ title: "FileOne.md", body: "# Hello World, file one" },
       { title: "FileTwo.md", body: "# Hello World, file two" },
       { title: "FileThree.md", body: "# Hello World, file three" },
       { title: "FileFour.md", body: "# Hello World, file four" },
       { title: "FileFive.md", body: "# Hello World, file five" }]
    getFiles: ->
      files

  return factory

@App.factory "Editor", ($rootScope) ->
  editor  = ace.edit("editor")
  mode    = ace.require("ace/mode/markdown").Mode
  session = editor.getSession()
  value   = ""

  factory =
    setup: ->
      editor.setTheme("ace/theme/eclipse")

      session.setMode(new mode())
      session.setUseWrapMode(true)
      session.on 'change', (event) ->
        $rootScope.$apply ->
          factory.updateValue()
    getValue: ->
      value
    updateValue: ->
      value = editor.getValue()

  $(document).ready ->
    factory.setup()

  return factory

@App.controller "SideBarController", ($scope, Files) ->
  $scope.files = Files

  $scope.activateFile = ->
    $scope.files.activeFile = @file
    false

@App.controller "EditorController", ($scope, $filter, $sce, Files, Editor) ->
  $scope.editor = Editor
  $scope.files  = Files
  $scope.$watch 'editor.getValue()', (newVal, oldVal) ->
    $scope.htmlOutput = $sce.trustAsHtml($filter('markdown')(newVal))
