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

export const carViewModel = kendo.observable({
  car: carData,
  show: () => carData.read()
})
