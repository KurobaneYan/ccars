let url = 'http://localhost:3000/api/upload_tag_params'
let url2 = 'http://localhost:3000/api/upload_tag'

$.cloudinary.config({ cloud_name: 'dvgllaiei', api_key: '578424487719447' })

$.get(url)
  .done((data, status) => {
    console.log('success', status, data)
  })

$.get(url2)
  .done((data, status) => {
    $('#i').html(data)
    if ($.fn.cloudinary_fileupload !== undefined) {
      $('input.cloudinary-fileupload[type=file]').cloudinary_fileupload()
      console.log('ready')
    }
    $('.cloudinary-fileupload').bind('cloudinarydone', function (e, data) {
      $('.preview').html($.cloudinary.image(data.result.public_id))
      $('.image_public_id').val(data.result.public_id)
      return true
    })
  })

$('input').unsigned_cloudinary_upload('mmdwfo4s', {
  cloud_name: 'dvgllaiei',
  tags: 'cars'
}, {
  multiple: true
})
.bind('cloudinarydone', function (e, data) {
  $('.thumbnails').append($.cloudinary.image(data.result.public_id, {
    format: 'jpg',
    width: 150,
    height: 100,
    crop: 'thumb',
    gravity: 'face',
    effect: 'saturation:50'
  }))
})
.bind('cloudinaryprogress', function (e, data) {
  console.log('data loaded is : ' + data.loaded + ' data size: ' + data.total)

  $('.progress_bar').css('width',
    Math.round((data.loaded * 100.0) / data.total) + '%')
})
