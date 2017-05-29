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
  },
  pageSize: 10
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
      this.models.read()
    } else {
      this.set('isModelEnabled', false)
    }
  },
  isModelEnabled: false,
  selectedModel: null,
  models: modelsData,
  yearSliderOnSlide: function (e) {
    console.log('on slide ', e.value.toString())
  },
  filter: function (e) {
    console.log(e)
  }
})
