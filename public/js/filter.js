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
    models: modelsData
  })

  kendo.bind($('#filter'), filter)
})
