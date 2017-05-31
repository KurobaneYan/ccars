/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const baseUrl = 'http://localhost:3000/api/cars/'

const carData = new kendo.data.DataSource({
  transport: {
    read: {
      url: baseUrl,
      dataType: 'json'
    },
    update: {
      url: baseUrl + 'update',
      dataType: 'json',
      type: 'post'
    },
    create: {
      url: baseUrl + 'create',
      dataType: 'json',
      type: 'post'
    },
    destroy: {
      url: baseUrl + 'destroy',
      dataType: 'json',
      type: 'post'
    }
  },
  schema: {
    model: {
      id: '_id',
      fields: {
        manufacturer: {
          type: 'string',
          validation: {
            required: true,
            manufacturervalidation: (input) => {
              if (input.is('[name="manufacturer"]') && input.val() !== '') {
                input.attr('data-manufacturervalidation-msg', 'Manufacturer name should start with capital letter')
                return /^[A-Z]/.test(input.val())
              }
              return true
            }
          },
          defaultValue: 'Mitsubishi'
        },
        model: {
          type: 'string',
          modelvalidation: {
            required: true,
            modelvalidation: (input) => {
              if (input.is('[name="model"]') && input.val() !== '') {
                input.attr('data-modelvalidation-msg', 'Model name should start with capital letter')
                return /^[A-Z]/.test(input.val())
              }
              return true
            }
          },
          defaultValue: 'Lancer'
        },
        year: {
          type: 'number',
          validation: { required: true, min: 1996, max: 2017 }
        },
        kilometrage: {
          type: 'number',
          validation: { required: true, min: 1, max: 1000 }
        },
        price: {
          type: 'number',
          validation: { required: true, min: 1, max: 1000000 }
        },
        transmissionType: {
          type: 'string',
          validation: {
            required: true,
            transmissionvalidation: (input) => {
              if (input.is('[name="transmissionType"]') && input.val() !== '') {
                input.attr('data-transmissionvalidation-msg', 'Transmission type should start with capital letter')
                return /^[A-Z]/.test(input.val())
              }
              return true
            }
          },
          defaultValue: 'Manual'
        },
        fuelType: {
          type: 'string',
          validation: {
            required: true,
            fuelvalidation: (input) => {
              if (input.is('[name="fuelType"]') && input.val() !== '') {
                input.attr('data-fuelvalidation-msg', 'Fuel type should start with capital letter')
                return /^[A-Z]/.test(input.val())
              }
              return true
            }
          },
          defaultValue: 'Gasoline'
        },
        engineDisplacement: {
          type: 'number',
          validation: { required: true, min: 1, max: 10000 }
        },
        views: {
          type: 'number',
          validation: { required: true, min: 0 }
        },
        photos: {
          defaultValue: ['https://img.memecdn.com/404-car-not-found_c_6767609.jpg']
        }
      }
    }
  },
  pageSize: 10
})

const adminViewModel = kendo.observable({
  cars: carData
})
/* harmony export (immutable) */ __webpack_exports__["a"] = adminViewModel;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const baseUrl = 'http://localhost:3000/api/car/'

const carData = new kendo.data.DataSource({
  transport: {
    read: {
      url: function () {
        return baseUrl + location.hash.slice(2)
      },
      dataType: 'json'
    }
  }
})

const carViewModel = kendo.observable({
  car: null,
  show: () => {
    carViewModel.set('car', carData)
    carData.read()
  }
})
/* harmony export (immutable) */ __webpack_exports__["a"] = carViewModel;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

const filterViewModel = kendo.observable({
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
      if (manufacturer === '') {
        this.set('selectedModel', null)
      }
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
/* harmony export (immutable) */ __webpack_exports__["a"] = filterViewModel;


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
    page: 1,
    sort: { field: 'views', dir: 'desc' }
  })
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__filter_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__car_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__admin_js__ = __webpack_require__(0);




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
const filter = new kendo.View('filter', { model: __WEBPACK_IMPORTED_MODULE_0__filter_js__["a" /* filterViewModel */] })
const admin = new kendo.View('admin', { model: __WEBPACK_IMPORTED_MODULE_2__admin_js__["a" /* adminViewModel */] })
const car = new kendo.View('car', {
  model: __WEBPACK_IMPORTED_MODULE_1__car_js__["a" /* carViewModel */],
  show: __WEBPACK_IMPORTED_MODULE_1__car_js__["a" /* carViewModel */].show
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
  __WEBPACK_IMPORTED_MODULE_0__filter_js__["a" /* filterViewModel */].setRouter(router)
  __WEBPACK_IMPORTED_MODULE_0__filter_js__["a" /* filterViewModel */].setUrlParams(params)
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


/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map