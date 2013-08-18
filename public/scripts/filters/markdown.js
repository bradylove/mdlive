(function() {
  this.App.filter("markdown", function() {
    return function(text) {
      return marked(text);
    };
  });

}).call(this);
