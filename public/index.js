let activeID

const fetchFolders = () => {
  fetch('/api/v1/folders')
  .then(response => response.json())
  .then(json => {
    json.map((folder) => {
      const { folder_name, id } = folder
      appendFolder(folder_name, id)
    })
  })
  .catch(e => console.log(e))
}

$('document').ready(fetchFolders())

const clearInput = (input) => {
  $(`${input}`).val('')
}

const enableFolderBTN = (e) => {
  let b = $('.create-folder-btn')
  e.target.value ? b.prop('disabled', false) : b.prop('disabled', true)
}

$('.create-folder-input').on('keyup', (e) => {
  enableFolderBTN(e)
})

$('.create-folder-btn').on('click', (e) => {
  e.preventDefault()
  let input = $('.create-folder-input').val()
  postFolder(input)
  clearInput('.create-folder-input')
})

const postFolder = (input) => {
  fetch('/api/v1/folders', {
    method: 'POST',
    headers: { 'Content-Type' : 'application/json' },
    'body': JSON.stringify({
      folder_name: input
    })
  })
  .then(response => response.json())
  .then(folders => {
    console.log(folders)
    let found = folders.find((folder) => {
      return folder.folder_name === input
    })
    appendFolder(found.folder_name, found.id)
  })
}

const appendFolder = (name, id) => {
  $('.folders').append(`
      <button class='folder-btn' id="${id}">${name}</button>
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

const enableSaveButton = () => {
  $('.create-url-btn').prop('disabled', false);
}

const disableSaveButton = () => {
  $('.create-url-btn').prop('disabled', true);
}

$('.site-name-input, .url-input').on('keyup', () => {
  let siteInput = $('.site-name-input').val()
  let urlInput  = $('.url-input').val()

  siteInput && urlInput ? enableSaveButton() : disableSaveButton()
});

$('.create-url-btn').on('click', (e) => {
  e.preventDefault()

  let name = $('.site-name-input').val()
  let url  = $('.url-input').val()

  if(validateUrl(url) == false || !activeID) {
    validateUrl(url) ? $('.urls').append('<p>ERROR. Select a folder.</p>') :
    $('.urls').append('<p>ERROR. input a valid URL!.</p>')
  }
  else {
    let result = addHTTP(url)
    postURL(name, result)
    clearInput('.site-name-input')
    clearInput('.url-input')
  }
})

const fetchURLS = (id) => {
  fetch(`/api/v1/folders/${id}/urls`)
  .then(response => response.json())
  .then(urls => {
    urls.map((url) => {
      appendURL(url)
    })
  })
}

const appendURL = (object) => {
  console.log(object)
  $('.urls').append(`
    <div class='url-container'>
      <p>Name: ${object.url_name}</p>
      <p>Visit Count:${object.visit_count}</p>
      <p>Complete URL</p>
      <a class='each-url' href="/${object.id}">${object.long_url}</a>
      <p>Short Url</p>
      <a class='each-url' href="/${object.id}">${document.URL + object.id}</a>
      <p>Created At: ${object.created_at}</p>
    </div>
  `)
}

const clearUrlSection = () => {
  $('.urls').empty()
}

$('.folders').on('click', '.folder-btn', (e) => {
  e.preventDefault()
  clearUrlSection()

  activeID = e.target.id

  $(e.target).addClass('active').siblings().removeClass('active')
  fetchURLS(activeID)
})


const postURL = (name, url) => {
  fetch('/api/v1/urls', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    'body': JSON.stringify({
      url_name: name,
      long_url: url,
      visit_count: 0,
      folder_id: activeID
    })
  })
  .then(response => response.json())
  .then(url => appendURL(url))
  .catch(e => console.log(e))
}

