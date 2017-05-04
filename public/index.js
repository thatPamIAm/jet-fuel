const fetchFolders = () => {
  fetch('/api/v1/folders')
  .then(response => response.json())
  .then(json => {
    json.map((folder) => {
      appendFolder(folder.folder_name)
      console.log(folder);
    })
  })
  .catch(e => console.log(e))
}

$('document').ready(fetchFolders())

const clearInput = (input) => {
  $(`${input}`).val('')
}

const toggleFolderButton = (e) => {
  let b = $('.create-folder-btn')
  e.target.value ? b.attr('disabled', false) : b.attr('disabled', true)
}

$('.create-folder-input').on('keyup', (e) => {
  toggleFolderButton(e)
})

$('.create-folder-btn').on('click', (e) => {
  e.preventDefault()
  let input = $('.create-folder-input').val()
  postFolder(input)
  appendFolder(input)
  clearInput('.create-folder-input')
})

const postFolder = (input) => {
  fetch('/api/v1/folders', {
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

// URL STUFF
const validateUrl = (url) => {
  var res = url.match(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/)
  if(res ) {
    return true;
  }
  else {
    return false
  }
}

const addHTTP = (url) => {
  if(!/^(f|ht)tps?:\/\//i.test(url)) {
    url = "http://" + url;
  }
  return url;
}

$('.create-url-btn').on('click', (e) => {
  e.preventDefault()

  let name = $('.site-name-input').val()
  let url  = $('.url-input').val()
  if(validateUrl(url) == false) {
    console.log('false');
  }
  else {
    let result = addHTTP(url)
    postURL(name, result)
  }
})

const postURL = (name, url) => {
  fetch('/api/v1/urls', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': name,
      'long_url': url
    })
  })
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(e => console.log(e))
}




