$(function () {
  let url = 'http://localhost:3000/api/cars/most-popular/25'

  let viewModel = kendo.observable({
    cars: new kendo.data.DataSource({
      transport: {
        read: {
          url: url,
          dataType: 'json'
        }
      }
    })
  })

  kendo.bind($('#cars'), viewModel)
})
