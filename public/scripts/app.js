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

  this.App.factory("Editor", function($rootScope) {
    var editor, factory, mode, session, value;
    editor = ace.edit("editor");
    mode = ace.require("ace/mode/markdown").Mode;
    session = editor.getSession();
    value = "";
    factory = {
      setup: function() {
        editor.setTheme("ace/theme/eclipse");
        session.setMode(new mode());
        session.setUseWrapMode(true);
        return session.on('change', function(event) {
          return $rootScope.$apply(function() {
            return factory.updateValue();
          });
        });
      },
      getValue: function() {
        return value;
      },
      updateValue: function() {
        return value = editor.getValue();
      }
    };
    $(document).ready(function() {
      return factory.setup();
    });
    return factory;
  });

  this.App.controller("SideBarController", function($scope, Files) {
    $scope.files = Files;
    return $scope.activateFile = function() {
      $scope.files.activeFile = this.file;
      return false;
    };
  });

  this.App.controller("EditorController", function($scope, $filter, $sce, Files, Editor) {
    $scope.editor = Editor;
    $scope.files = Files;
    return $scope.$watch('editor.getValue()', function(newVal, oldVal) {
      return $scope.htmlOutput = $sce.trustAsHtml($filter('markdown')(newVal));
    });
  });

}).call(this);
