


$('.create-folder-btn').on('click', (e) => {
  e.preventDefault()
  let inputVal = $('.create-folder-input').val()
  createFolder(inputVal)
})

const createFolder = (inputVal) => {
  $('.folders').append(`
    <div class='fav-folders'>
      <p>${inputVal} </p>
    </div>
  `)
}
