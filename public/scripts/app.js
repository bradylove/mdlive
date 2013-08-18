(function() {
  this.App = angular.module("App", ['ngSanitize']);

  this.App.factory("Files", function() {
    var factory;
    factory = {
      activeFile: null,
      files: [],
      getFiles: function() {
        return files;
      },
      saveFiles: function() {
        if (this.files !== {} || this.files !== null) {
          return localStorage.setItem("files", JSON.stringify(this.files));
        }
      },
      loadFiles: function() {
        var files;
        files = JSON.parse(localStorage.getItem("files"));
        if (files && files.length > 0) {
          this.files = files;
        } else {
          this.files = [
            {
              title: "Untitled",
              body: ""
            }, {
              title: "Untitled Two",
              body: "Hello"
            }
          ];
        }
        return this.activeFile = this.files[0];
      }
    };
    factory.loadFiles();
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
      $scope.htmlOutput = $sce.trustAsHtml($filter('markdown')(newVal));
      return $scope.files.saveFiles();
    });
  });

}).call(this);
