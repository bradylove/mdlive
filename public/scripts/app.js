(function() {
  this.App = angular.module("App", []);

  this.App.directive("splitter", function() {
    return function(scope, element) {
      element.splitter();
      element = element;
      return $(window).bind('resize', function(event) {
        return element.trigger('resize');
      });
    };
  });

  this.App.directive("editor", function() {
    return function(scope, element) {
      return $(document).ready(function() {
        return CodeMirror(editor, {
          mode: "markdown",
          lineNumbers: true,
          lineWrapping: true
        });
      });
    };
  });

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

  this.App.controller("SideBar", function($scope, Files) {
    $scope.files = Files;
    return $scope.activateFile = function() {
      $scope.files.activeFile = this.file;
      return false;
    };
  });

}).call(this);
