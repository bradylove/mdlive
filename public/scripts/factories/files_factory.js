(function() {
  this.App.factory("FilesFactory", function() {
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
            }
          ];
        }
        return this.activeFile = this.files[0];
      },
      newFile: function(title) {
        var newFileIndex;
        console.log("New file added");
        newFileIndex = this.files.push({
          title: title,
          body: ""
        });
        return this.activeFile = this.files[newFileIndex - 1];
      }
    };
    factory.loadFiles();
    return factory;
  });

}).call(this);
