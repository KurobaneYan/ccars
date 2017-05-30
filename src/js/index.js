import { filterViewModel } from './filter.js'
import { carViewModel } from './car.js'
import { adminViewModel } from './admin.js'

$.cloudinary.config({ cloud_name: 'dvgllaiei', api_key: '578424487719447' })

const url = 'http://localhost:3000/api/cars/most-popular/25'

const indexViewModel = kendo.observable({
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
const index = new kendo.View('index', { model: indexViewModel })
const filter = new kendo.View('filter', { model: filterViewModel })
const admin = new kendo.View('admin', { model: adminViewModel })
const car = new kendo.View('car', {
  model: carViewModel,
  show: carViewModel.show
})
const routeMissing = new kendo.View('routeMissing')

const router = new kendo.Router({
  routeMissing: (e) => {
    layout.showIn('#content', routeMissing)
  }
})

router.bind('init', () => {
  layout.render($('#app'))
})

router.route('/', () => {
  layout.showIn('#content', index)
})

router.route('/filter', (params) => {
  filterViewModel.setRouter(router)
  filterViewModel.setUrlParams(params)
  layout.showIn('#content', filter)
})

router.route('/admin', () => {
  layout.showIn('#content', admin)
})

router.route('/:carId', (carId) => {
  layout.showIn('#content', car)
})

$(() => {
  router.start()
})
