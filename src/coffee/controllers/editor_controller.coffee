@App.controller "EditorController", ($scope, $filter, $sce, FilesFactory) ->
  $scope.files      = FilesFactory
  $scope.htmlOutput = ""

  $scope.$watch 'files.activeFile.body', (newVal, oldVal) ->
    newVal ||= ""
    $scope.htmlOutput = $sce.trustAsHtml($filter('markdown')(newVal))
    $scope.files.saveFiles()
