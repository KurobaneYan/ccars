const url = 'http://localhost:3000/api/cars/most-popular/25'

const viewModel = kendo.observable({
  cars: new kendo.data.DataSource({
    transport: {
      read: {
        url: url,
        dataType: 'json'
      }
    }
  })
})

const layout = new kendo.Layout('layout')
const index = new kendo.View('index', {
  model: viewModel
})

const router = new kendo.Router()

router.bind('init', () => {
  layout.render($('#app'))
})

router.route('/', () => {
  layout.showIn('#content', index)
})

$(() => {
  router.start()
})