@App.filter "markdown", ->
  return (text) ->
    marked(text)
