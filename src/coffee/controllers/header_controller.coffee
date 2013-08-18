@App.controller "HeaderController", ($scope, FilesFactory) ->
  $scope.files = FilesFactory

  $scope.addNewFile = ->
    $scope.files.newFile("New File")
