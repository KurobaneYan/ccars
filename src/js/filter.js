const manufacturersUrl = 'http://localhost:3000/api/manufacturers/'
const baseModelsUrl = 'http://localhost:3000/api/models/'

const manufacturersData = new kendo.data.DataSource({
  transport: {
    read: {
      url: manufacturersUrl,
      dataType: 'json'
    }
  }
})

const modelsData = new kendo.data.DataSource({
  transport: {
    read: {
      url: function () {
        return baseModelsUrl + filterViewModel.get('selectedManufacturer')
      },
      dataType: 'json'
    }
  }
})

const carsData = new kendo.data.DataSource({
  transport: {
    read: {
      url: 'http://localhost:3000/api/cars',
      dataType: 'json'
    }
  }
})

export const filterViewModel = kendo.observable({
  cars: carsData,
  selectedManufacturer: null,
  years: [1996, 2017],
  price: [0, 1000000],
  transmission: 'Manual',
  fuelType: 'Gasoline',
  kilometrage: null,
  engineDisplacement: null,
  manufacturers: manufacturersData,
  manufacturerOnChange: function () {
    const manufacturer = this.get('selectedManufacturer')
    if ((manufacturer !== null) && (manufacturer !== '')) {
      this.set('isModelEnabled', true)
      this.set('selectedModel', null)
      this.models.read()
    } else {
      this.set('isModelEnabled', false)
    }
    this.changeRoute()
  },
  isModelEnabled: false,
  selectedModel: null,
  models: modelsData,
  yearsTest: function (e) {
    console.log(e)
  },
  applyFilter: function () {
    const manufacturer = this.get('selectedManufacturer')
    const model = this.get('selectedModel')
    const years = this.get('years')
    let cars = this.get('cars')
    let filter = []
    if ((manufacturer !== null) && (manufacturer !== '')) {
      filter.push({
        field: 'manufacturer',
        operator: 'eq',
        value: manufacturer
      })
    }
    if ((model !== null) && (model !== '')) {
      filter.push({
        field: 'model',
        operator: 'eq',
        value: model
      })
    }
    filter.push({
      field: 'year',
      operator: 'gte',
      value: years[0]
    })
    filter.push({
      field: 'year',
      operator: 'lte',
      value: years[1]
    })
    cars.query({
      filter: filter,
      pageSize: 10,
      page: 1
    })
  },
  changeRoute: function () {
    const router = this.get('router')
    const manufacturer = this.get('selectedManufacturer')
    const model = this.get('selectedModel')
    const years = this.get('years')
    let newParams = {}
    if ((manufacturer !== null) && (manufacturer !== '')) {
      newParams.manufacturer = manufacturer
    }
    if ((model !== null) && (model !== '')) {
      newParams.model = model
    }
    newParams.yearFrom = years[0]
    newParams.yearTo = years[1]
    let newUrl = '/filter'
    const newParamsUrl = $.param(newParams)
    if (newParamsUrl !== '') {
      newUrl += '?' + newParamsUrl
    }
    console.log('changing route', newUrl)
    router.navigate(newUrl) // or replace
  },
  resetFilter: function (e) {
    console.log('TODO')
    console.log(e)
  },
  params: null,
  setUrlParams: function (params) {
    this.set('params', params)
    if (typeof params.manufacturer !== 'undefined') {
      this.set('selectedManufacturer', params.manufacturer)
      this.set('isModelEnabled', true)
    }
    if (typeof params.model !== 'undefined') {
      this.set('isModelEnabled', true)
      this.set('selectedModel', params.model)
    }
    if ((typeof params.yearFrom !== 'undefined') && (typeof params.yearTo !== 'undefined')) {
      let from = parseInt(params.yearFrom, 10)
      let to = parseInt(params.yearTo, 10)
      from = from < 1996 ? 1996 : from
      to = to > 2017 ? 2017 : to
      const newYears = [from, to]
      this.set('years', newYears)
    }
    this.applyFilter()
  },
  router: null,
  setRouter: function (router) {
    this.set('router', router)
  }
})
