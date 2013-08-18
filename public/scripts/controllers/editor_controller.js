(function() {
  this.App.controller("EditorController", function($scope, $filter, $sce, FilesFactory) {
    $scope.files = FilesFactory;
    $scope.htmlOutput = "";
    return $scope.$watch('files.activeFile.body', function(newVal, oldVal) {
      newVal || (newVal = "");
      $scope.htmlOutput = $sce.trustAsHtml($filter('markdown')(newVal));
      return $scope.files.saveFiles();
    });
  });

}).call(this);
