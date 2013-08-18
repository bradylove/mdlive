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

@App.controller "SideBarController", ($scope, Files) ->
  $scope.files = Files

  $scope.activateFile = ->
    $scope.files.activeFile = @file
    false

@App.controller "EditorController", ($scope, $filter, $sce, Files) ->
  $scope.files  = Files
  $scope.htmlOutput = ""

  $scope.$watch 'files.activeFile.body', (newVal, oldVal) ->
    newVal ||= ""
    $scope.htmlOutput = $sce.trustAsHtml($filter('markdown')(newVal))
