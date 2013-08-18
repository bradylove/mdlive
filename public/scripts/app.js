(function() {
  this.App = angular.module("App", ['ngSanitize']);

  this.App.factory("Files", function() {
    var factory;
    factory = {
      activeFile: null,
      files: [
        {
          title: "FileOne.md",
          body: "# Hello World, file one"
        }, {
          title: "FileTwo.md",
          body: "# Hello World, file two"
        }, {
          title: "FileThree.md",
          body: "# Hello World, file three"
        }, {
          title: "FileFour.md",
          body: "# Hello World, file four"
        }, {
          title: "FileFive.md",
          body: "# Hello World, file five"
        }
      ],
      getFiles: function() {
        return files;
      }
    };
    return factory;
  });

  this.App.controller("SideBarController", function($scope, Files) {
    $scope.files = Files;
    return $scope.activateFile = function() {
      $scope.files.activeFile = this.file;
      return false;
    };
  });

  this.App.controller("EditorController", function($scope, $filter, $sce, Files) {
    $scope.files = Files;
    $scope.htmlOutput = "";
    return $scope.$watch('files.activeFile.body', function(newVal, oldVal) {
      newVal || (newVal = "");
      return $scope.htmlOutput = $sce.trustAsHtml($filter('markdown')(newVal));
    });
  });

}).call(this);
