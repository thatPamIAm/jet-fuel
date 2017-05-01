


$('.create-folder-btn').on('click', () => {
  let inputVal = $('.create-folder-input').val()
  createFolder(inputVal)
})

const createFolder = (inputVal) => {
  $('.folders').append(`
    <div> ${inputVal} </div>
  `)
}