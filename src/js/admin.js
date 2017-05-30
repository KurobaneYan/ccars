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

export const adminViewModel = kendo.observable({
  cars: carData
})
