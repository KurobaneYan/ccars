$(function () {
  const manufacturersData = 'http://localhost:3000/api/manufacturersData/'
  const modelsData = 'http://localhost:3000/api/modelsData/'

  const manufacturersDataSource = new kendo.data.DataSource({
    transport: {
      read: {
        url: manufacturersData,
        dataType: 'json'
      }
    }
  })

  const modelsDataSource = new kendo.data.DataSource({
    transport: {
      read: {
        url: modelsData,
        dataType: 'json'
      }
    }
  })

  let chartsViewModel = kendo.observable({
    manufacturersData: manufacturersDataSource,
    modelsData: modelsDataSource
  })

  kendo.bind($('#charts'), chartsViewModel)
})
