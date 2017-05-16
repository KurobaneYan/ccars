let url = 'http://localhost:1337/api/cars/mostPopular/25'

$.get(url)
  .done((data, status) => {
  let viewModel = kendo.observable({
    cars: data
  })

  kendo.bind($('#cars'), viewModel)
})

