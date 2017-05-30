const mongoose = require('mongoose')

const Car = require('./models/car')

const config = require('./config')

mongoose.Promise = global.Promise
mongoose.connect(config.databaseUrl)
const connection = mongoose.connection

connection.on('error', console.error.bind(console, 'connection error:'))
connection.once('open', () => {
  console.log('Mongoose connected to ' + config.databaseUrl)
})

const fuelTypes = ['Gasoline', 'Disel']
const transmissionTypes = ['Manual', 'Automatic']

let carsData = [
  [
    'Mitsubishi',
    [
      [ 'Lancer', 'https://www.mitsubishi-motors.ca/media/vehicle/nav/15LanEvoFE_Titanium-Grey_09_medium.png' ],
      ['Outlander', 'http://o.aolcdn.com/dims-global/dims3/GLOB/legacy_thumbnail/750x422/quality/95/http://www.blogcdn.com/slideshows/images/slides/366/249/0/S3662490/slug/l/001-2015-mitsubishi-outlander-sport-quick-spin-1.jpg'],
      ['Pajero', 'https://www.mitsubishi-motors.com.au/uploads/vehicles/pajero/2017/pajero-gls.png']
    ]
  ],
  [
    'Volvo',
    [
      ['S90', 'https://i.ytimg.com/vi/BYCPcQAsy_g/maxresdefault.jpg'],
      ['v90', 'https://2.bp.blogspot.com/-yeGjov-PR6Y/V9q_Nf98B2I/AAAAAAABeIY/tJ8rU8Dlba88VZXgUNECm-zE5s1vrfb2wCLcB/s1600/Volvo-V90-CC.jpg'],
      ['XC90', 'http://st.motortrend.com/uploads/sites/10/2016/02/2017-volvo-xc90-front-three-quarters.jpg']
    ]
  ],
  [
    'BMW',
    [
      ['I8', 'http://buyersguide.caranddriver.com/media/assets/submodel/7821.jpg'],
      ['I3', 'http://www.bmw.co.uk/dam/brandBM/common/newvehicles/i-series/i3/2015/at-a-glance/bmwi-i3-more-than-a-car-project-i-03.jpg.resource.1452011239907.jpg'],
      ['M6', 'http://cdn.bmwblog.com/wp-content/uploads/2017/02/Bill-Auberlen-BMW-M4-GTS-01.jpg']
    ]
  ]
]

function addCars () {
  let cars = []
  while (cars.length < 100) {
    for (let i in carsData) {
      let make = carsData[i][0]
      for (let j in carsData[i][1]) {
        let model = carsData[i][1][j][0]
        let photo = carsData[i][1][j][1]
        let fuelIndex = Math.round(Math.random())
        let transmissionIndex = Math.round(Math.random())
        let tmpCar = new Car({
          manufacturer: make,
          model: model,
          year: getRandomInt(1999, 2017),
          kilometrage: getRandomInt(10, 500),
          fuelType: fuelTypes[fuelIndex],
          engineDisplacement: getRandomInt(16, 50) * 100,
          transmissionType: transmissionTypes[transmissionIndex],
          photos: [photo],
          price: getRandomInt(3, 100) * 10000,
          views: getRandomInt(0, 1000)
        })
        cars.push(tmpCar.save())
      }
    }
  }
  return Promise.all(cars)
}

function getRandomInt (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

addCars()
  .then(() => {
    console.log('Done')
    process.exit()
  })
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
