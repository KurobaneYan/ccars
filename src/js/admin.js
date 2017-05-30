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
        manufacturer: { type: 'string' },
        model: { type: 'string' },
        year: { type: 'number' },
        kilometrage: { type: 'number' },
        price: { type: 'number' },
        transmissionType: { type: 'string' },
        fuelType: { type: 'string' },
        engineDisplacement: { type: 'number' },
        views: { type: 'number' },
        photos: {
          defaultValue: ['https://img.memecdn.com/404-car-not-found_c_6767609.jpg']
        }
      }
    }
  },
  pageSize: 10
})

export const adminViewModel = kendo.observable({
  cars: carData
})
