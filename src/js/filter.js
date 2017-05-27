$(function () {
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

  let modelsData = new kendo.data.DataSource({
    transport: {
      read: {
        url: function () {
          return baseModelsUrl + filter.get('selectedManufacturer')
        },
        dataType: 'json'
      }
    }
  })

  let filter = kendo.observable({
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
    }
  })

  kendo.bind($('#filter'), filter)

  $('#showAlert').click(function () {
    const manufacturer = filter.get('selectedManufacturer')
    const model = filter.get('selectedModel')
    const years = filter.get('years')
    const price = filter.get('price')
    const kilometrage = filter.get('kilometrage')
    const displacement = filter.get('engineDisplacement')
    let msg = ''
    if (manufacturer !== null) {
      msg += 'manufacturer ' + manufacturer + '\n'
    }
    if (model !== null) {
      msg += 'model ' + model + '\n'
    }
    msg += 'year from ' + years[0] + ' to ' + years[1] + '\n'
    msg += 'price from ' + price[0] + ' to ' + price[1] + '\n'
    msg += 'transmission ' + filter.get('transmission') + '\n'
    msg += 'fuel type ' + filter.get('fuelType') + '\n'
    if (kilometrage !== null) {
      msg += 'kilometrage ' + kilometrage + '\n'
    }
    if (displacement !== null) {
      msg += 'engine displacenemt ' + displacement + '\n'
    }
    alert(msg)
  })
})
