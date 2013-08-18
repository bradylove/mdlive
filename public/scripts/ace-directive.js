(function() {
  this.App.directive('ace', function($timeout) {
    var resizeEditor;
    resizeEditor = function(editor, elem) {
      var lineHeight, rows;
      lineHeight = editor.renderer.lineHeight;
      rows = editor.getSession().getLength();
      return editor.resize();
    };
    return {
      restrict: 'A',
      require: '?ngModel',
      scope: true,
      link: function(scope, elem, attrs, ngModel) {
        var MarkdownMode, editor, node, session;
        node = elem[0];
        editor = ace.edit(node);
        editor.setTheme('ace/theme/eclipse');
        MarkdownMode = ace.require('ace/mode/markdown').Mode;
        session = editor.getSession();
        session.setMode(new MarkdownMode());
        session.setUseWrapMode(true);
        session.setUseSoftTabs(true);
        editor.setShowPrintMargin(false);
        $(elem).height("100%");
        $(elem).width("100%");
        editor.resize();
        ngModel.$render = function() {
          return editor.setValue(ngModel.$viewValue);
        };
        return editor.on('change', function() {
          return scope.$apply(function() {
            var value;
            value = editor.getValue();
            return ngModel.$setViewValue(value);
          });
        });
      }
    };
  });

}).call(this);
