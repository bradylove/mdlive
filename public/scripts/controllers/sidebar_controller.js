(function() {
  this.App.controller("SideBarController", function($scope, FilesFactory) {
    $scope.files = FilesFactory;
    return $scope.activateFile = function() {
      $scope.files.activeFile = this.file;
      return false;
    };
  });

}).call(this);
