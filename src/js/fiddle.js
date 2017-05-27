window.ajaxSuccess = function () {
  const response = JSON.parse(this.responseText)
  console.log('ajaxSuccess', typeof this.responseText)
  document.getElementById('uploaded').setAttribute('src', response['secure_url'])
  document.getElementById('results').innerText = this.responseText
}

window.AJAXSubmit = function (formElement) {
  console.log('starting AJAXSubmit')
  if (!formElement.action) { return }
  var xhr = new XMLHttpRequest()
  xhr.onload = window.ajaxSuccess
  xhr.open('post', 'https://api.cloudinary.com/v1_1/dvgllaiei/image/upload')
  console.log(new FormData(formElement))
  xhr.send(new FormData(formElement))
}
