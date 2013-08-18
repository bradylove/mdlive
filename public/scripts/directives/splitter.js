(function() {
  this.App.directive("splitter", function() {
    return function(scope, element) {
      element.splitter();
      element = element;
      return $(window).bind('resize', function(event) {
        return element.trigger('resize');
      });
    };
  });

}).call(this);
