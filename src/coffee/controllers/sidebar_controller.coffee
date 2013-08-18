@App.controller "SideBarController", ($scope, FilesFactory) ->
  $scope.files = FilesFactory

  $scope.activateFile = ->
    $scope.files.activeFile = @file
    false
