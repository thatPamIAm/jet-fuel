const createFolderBtn = $('.create-folder-btn')
const createFolderInput = $('.create-folder-input')


createFolderBtn.on('click', () => {
  console.log('click');
})

createFolderInput.keyup(() => {
  console.log('changing');
})
