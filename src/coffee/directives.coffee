@App.directive "splitter", ->
  return (scope, element) ->
    element.splitter()

    element = element
    $(window).bind 'resize', (event) ->
      element.trigger('resize')
