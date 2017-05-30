const manufacturersUrl = 'http://localhost:3000/api/manufacturers/'
const baseModelsUrl = 'http://localhost:3000/api/models/'

const filterDefaults = {
  selectedManufacturer: null,
  selectedModel: null,
  years: [1996, 2017],
  price: [0, 1000000],
  transmission: '',
  fuelType: '',
  kilometrage: 0,
  engineDisplacement: 0,
  isModelEnabled: false
}

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
  transmission: '',
  fuelType: '',
  kilometrage: 0,
  engineDisplacement: 0,
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
  applyFilter: applyFilter,
  changeDisplacement: function () {
    let disp = this.get('engineDisplacement')
    if ((disp < 100) && (disp > 0)) {
      disp = 100
    } else {
      disp = Math.round(disp / 100) * 100
    }
    this.set('engineDisplacement', disp)
    this.changeRoute()
  },
  changeRoute: changeRoute,
  resetFilter: resetFilter,
  setUrlParams: setUrlParams,
  router: null,
  setRouter: function (router) {
    this.set('router', router)
  }
})

function resetFilter () {
  this.set('selectedManufacturer', filterDefaults.selectedManufacturer)
  this.set('selectedModel', filterDefaults.selectedModel)
  this.set('isModelEnabled', filterDefaults.isModelEnabled)
  this.set('years', filterDefaults.years)
  this.set('price', filterDefaults.price)
  this.set('transmission', filterDefaults.transmission)
  this.set('fuelType', filterDefaults.fuelType)
  this.set('kilometrage', filterDefaults.kilometrage)
  this.set('engineDisplacement', filterDefaults.engineDisplacement)
  const router = this.get('router')
  router.navigate('/filter')
}

function changeRoute () {
  const router = this.get('router')
  const manufacturer = this.get('selectedManufacturer')
  const model = this.get('selectedModel')
  const years = this.get('years')
  const price = this.get('price')
  const transmission = this.get('transmission')
  const fuelType = this.get('fuelType')
  const kilometrage = this.get('kilometrage')
  const displacement = this.get('engineDisplacement')
  let newParams = {}
  if ((manufacturer !== null) && (manufacturer !== '')) {
    newParams.manufacturer = manufacturer
  }
  if ((model !== null) && (model !== '')) {
    newParams.model = model
  }
  if (transmission !== '') {
    newParams.transmission = transmission
  }
  if (fuelType !== '') {
    newParams.fuelType = fuelType
  }
  if (kilometrage !== 0) {
    newParams.kilometrage = kilometrage
  }
  if (displacement !== 0) {
    newParams.engineDisplacement = displacement
  }
  newParams.yearFrom = years[0]
  newParams.yearTo = years[1]
  newParams.priceFrom = price[0]
  newParams.priceTo = price[1]
  let newUrl = '/filter'
  const newParamsUrl = $.param(newParams)
  if (newParamsUrl !== '') {
    newUrl += '?' + newParamsUrl
  }
  router.navigate(newUrl)
}

function setUrlParams (params) {
  if (typeof params.manufacturer !== 'undefined') {
    this.set('selectedManufacturer', params.manufacturer)
    this.set('isModelEnabled', true)
    if (typeof params.model !== 'undefined') {
      this.set('selectedModel', params.model)
    }
  }
  if ((typeof params.yearFrom !== 'undefined') && (typeof params.yearTo !== 'undefined')) {
    let from = parseInt(params.yearFrom, 10)
    let to = parseInt(params.yearTo, 10)
    from = from < 1996 ? 1996 : from
    to = to > 2017 ? 2017 : to
    const newYears = [from, to]
    this.set('years', newYears)
  }
  if ((typeof params.priceFrom !== 'undefined') && (typeof params.priceTo !== 'undefined')) {
    let from = parseInt(params.priceFrom, 10)
    let to = parseInt(params.priceTo, 10)
    from = from < 0 ? 0 : from
    to = to > 1000000 ? 1000000 : to
    const newPrice = [from, to]
    this.set('price', newPrice)
  }
  if (typeof params.transmission !== 'undefined') {
    this.set('transmission', params.transmission)
  }
  if (typeof params.fuelType !== 'undefined') {
    this.set('fuelType', params.fuelType)
  }
  if (typeof params.kilometrage !== 'undefined') {
    let kilometrage = parseInt(params.kilometrage, 10)
    kilometrage = kilometrage < 0 ? 0 : kilometrage
    kilometrage = kilometrage > 1000 ? 1000 : kilometrage
    this.set('kilometrage', kilometrage)
  }
  if (typeof params.engineDisplacement !== 'undefined') {
    let displacement = parseInt(params.engineDisplacement, 10)
    displacement = displacement < 0 ? 0 : displacement
    displacement = displacement > 10000 ? 10000 : displacement
    this.set('engineDisplacement', displacement)
  }
  this.applyFilter()
}

function applyFilter () {
  const manufacturer = this.get('selectedManufacturer')
  const model = this.get('selectedModel')
  const years = this.get('years')
  const price = this.get('price')
  const transmission = this.get('transmission')
  const fuelType = this.get('fuelType')
  const kilometrage = this.get('kilometrage')
  const displacement = this.get('engineDisplacement')
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
  if (transmission !== '') {
    filter.push({
      field: 'transmissionType',
      operator: 'eq',
      value: transmission
    })
  }
  if (fuelType !== '') {
    filter.push({
      field: 'fuelType',
      operator: 'eq',
      value: fuelType
    })
  }
  if (kilometrage !== 0) {
    filter.push({
      field: 'kilometrage',
      operator: 'lte',
      value: kilometrage
    })
  }
  if (displacement !== 0) {
    filter.push({
      field: 'engineDisplacement',
      operator: 'eq',
      value: displacement
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
  filter.push({
    field: 'price',
    operator: 'gte',
    value: price[0]
  })
  filter.push({
    field: 'price',
    operator: 'lte',
    value: price[1]
  })
  cars.query({
    filter: filter,
    pageSize: 10,
    page: 1
  })
}
