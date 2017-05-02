$('.create-folder-btn').on('click', (e) => {
  e.preventDefault()
  let inputVal = $('.create-folder-input').val()
  createFolder(inputVal)
  appendFolder(inputVal)
})

const createFolder = (input) => {
  fetch('./api/folders', {
    method:'POST',
    headers:{'Content-Type' : 'application/json'},
    'body':JSON.stringify({
      'title':input
    })
  })
  .then(response => response.json())
  .then(json => console.log(json))
}

const appendFolder = (inputVal) => {
  $('.folders').append(`
      <p>${inputVal} </p>
  `)
}
