@App.factory "FilesFactory", ->
  factory =
    activeFile: null
    files: []
    getFiles: ->
      files

    saveFiles: ->
      if @files != {} || @files != null
        localStorage.setItem("files", JSON.stringify(@files))

    loadFiles: ->
      files = JSON.parse(localStorage.getItem("files"))

      if files && files.length > 0
        @files = files
      else
        @files = [{ title: "Untitled", body: "" }]


      @activeFile = @files[0]

  factory.loadFiles()

  return factory
