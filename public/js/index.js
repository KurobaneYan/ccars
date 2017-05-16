let url = 'http://localhost:1337/api/cars/mostPopular/25'

let viewModel = kendo.observable({
  cars: new kendo.data.DataSource({
    batch: true,
    transport: {
      read: {
        url: url,
        dataType: 'json'
      }
    }
  })
})

kendo.bind($('#cars'), viewModel)
