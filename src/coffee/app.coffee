@App = angular.module("App", ['ngSanitize'])

@App.factory "Files", ->
  factory =
    activeFile: null
    files: []

    # [{ title: "FileOne.md", body: "# Hello World, file one" },
    #  { title: "FileTwo.md", body: "# Hello World, file two" },
    #  { title: "FileThree.md", body: "# Hello World, file three" },
    #  { title: "FileFour.md", body: "# Hello World, file four" },
    #  { title: "FileFive.md", body: "# Hello World, file five" }]
    getFiles: ->
      files

    saveFiles: ->
      if @files != {} || @files != null
        localStorage.setItem("files", JSON.stringify(@files))

    loadFiles: ->
      files = JSON.parse(localStorage.getItem("files"))

      if files && files.length > 0
        @files = files
      else
        @files = [{ title: "Untitled", body: "" },
                  { title: "Untitled Two", body: "Hello" }]

      @activeFile = @files[0]

  factory.loadFiles()

  return factory

@App.controller "SideBarController", ($scope, Files) ->
  $scope.files = Files

  $scope.activateFile = ->
    $scope.files.activeFile = @file
    false

@App.controller "EditorController", ($scope, $filter, $sce, Files) ->
  $scope.files      = Files
  $scope.htmlOutput = ""

  $scope.$watch 'files.activeFile.body', (newVal, oldVal) ->
    newVal ||= ""
    $scope.htmlOutput = $sce.trustAsHtml($filter('markdown')(newVal))
    $scope.files.saveFiles()
