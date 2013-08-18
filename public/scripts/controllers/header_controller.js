(function() {
  this.App.controller("HeaderController", function($scope, FilesFactory) {
    $scope.files = FilesFactory;
    return $scope.addNewFile = function() {
      return $scope.files.newFile("New File");
    };
  });

}).call(this);
