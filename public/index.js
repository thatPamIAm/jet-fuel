$('document').ready(
  fetch('/api/folders')
  .then(response => response.json())
  .then(json => {
    json.folders.map((folders) => {
      appendFolder(folders.title)
    })
  })
)

$('.create-folder-btn').on('click', (e) => {
  e.preventDefault()
  let input = $('.create-folder-input').val()
  postFolder(input)
  appendFolder(input)
})

const postFolder = (input) => {
  fetch('/api/folders', {
    method:'POST',
    headers:{'Content-Type' : 'application/json'},
    'body':JSON.stringify({
      'title': input
    })
  })
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(e => console.log(e))
}

const appendFolder = (input) => {
  $('.folders').append(`
      <p>${input} </p>
  `)
}



// /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/