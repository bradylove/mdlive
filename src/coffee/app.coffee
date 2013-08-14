@App = angular.module("App", [])

@App.directive "splitter", ->
  return (scope, element) ->
    element.splitter()

    element = element
    $(window).bind 'resize', (event) ->
      element.trigger('resize')

@App.directive "editor", ->
  return (scope, element) ->
    $(document).ready ->
      CodeMirror editor,
        mode: "markdown"
        lineNumbers: true
        lineWrapping: true

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

@App.controller "SideBar", ($scope, Files) ->
  $scope.files = Files

  $scope.activateFile = ->
    $scope.files.activeFile = @file
    false
