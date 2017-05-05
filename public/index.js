
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

$(() => fetchFolders())

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

const fetchURLS = (id) => {
  fetch(`/api/v1/folders/${id}/urls`)
  .then(response => response.json())
  .then(urls => {
    urls.map((url) => {
      appendURL(url)
    })
  })
}

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

const appendURL = (object) => {
  console.log(object)
  $('.urls').append(`
    <div class='url-container'>
      <p class='url-detail'>NAME</p>
      <p>${object.url_name}</p>
      <p class='url-detail'>VISIT COUNT</p>
      <p>${object.visit_count}</p>
      <p class='url-detail'>COMPLETE URL</p>
      <a class='each-url' href="/${object.id}">${object.long_url}</a>
      <p class='url-detail'>SHORT URL</p>
      <a class='each-url' href="/${object.id}">${document.URL + object.id}</a>
      <p class='url-detail'>CREATED AT</p>
      <p>${object.created_at}</p>
    </div>
  `)
}


// EVENT HANDLERS
$('.create-folder-input').on('keyup', (e) => {
  enableFolderBTN(e)
})

$('.create-folder-btn').on('click', (e) => {
  e.preventDefault()
  let input = $('.create-folder-input').val()
  postFolder(input)
  clearInput('.create-folder-input')
})

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
    validateUrl(url) ? $('.urls').prepend('<p>ERROR. Select a folder.</p>') :
    $('.urls').prepend('<p>ERROR. input a valid URL!.</p>')
  }
  else {
    let result = addHTTP(url)
    postURL(name, result)
    clearInput('.site-name-input')
    clearInput('.url-input')
  }
})

$('.folders').on('click', '.folder-btn', (e) => {
  e.preventDefault()
  clearUrlSection()

  activeID = e.target.id

  $(e.target).addClass('active').siblings().removeClass('active')
  fetchURLS(activeID)
})

$('.sort-by-date').on('click', (e) => {

  if(!activeID){
    $('.urls').append(`<p>select a folder to sort</p>`)
  }
  e.preventDefault()

  fetch(`/api/v1/folders/${activeID}/urls`)
  .then(response => response.json())
  .then(json => {
    clearUrlSection()
    // sortByDate(json)
    // sortOrder = "descending"
  })
})

$('.sort-by-visits-desc').on('click', (e) => {
  if(!activeID){
    $('.urls').append(`<p>select a folder to sort</p>`)
  }
  e.preventDefault()
  fetch(`/api/v1/folders/${activeID}/urls`)
  .then(response => response.json())
  .then(json => {
    clearUrlSection()
    sortByVisitsDesc(json)
  })
})

$('.sort-by-visits-asc').on('click', (e) => {
  if(!activeID){
    $('.urls').append(`<p>select a folder to sort</p>`)
  }
  e.preventDefault()
  fetch(`/api/v1/folders/${activeID}/urls`)
  .then(response => response.json())
  .then(json => {
    clearUrlSection()
    sortByVisitsAsc(json)
  })
})


// HELPERS
const sortByDate = (urls) => {
  // FIX DIS
  // maybe restructure moment.js data ?
  console.log(urls);
}

const sortByVisitsDesc = (urls) => {
  let sorted = urls.sort((a, b) => {
    return a.visit_count - b.visit_count
  })
  console.log(sorted);
  sorted.map(descending => appendURL(descending))
}

const sortByVisitsAsc = (urls) => {
  let sorted = urls.sort((a, b) => {
    return b.visit_count - a.visit_count
  })
  console.log(sorted);
  sorted.map(ascending => appendURL(ascending))
}

const clearUrlSection = () => {
  $('.urls').empty()
}

const enableSaveButton = () => {
  $('.create-url-btn').prop('disabled', false);
}

const disableSaveButton = () => {
  $('.create-url-btn').prop('disabled', true);
}

const clearInput = (input) => {
  $(`${input}`).val('')
}

const enableFolderBTN = (e) => {
  let b = $('.create-folder-btn')
  e.target.value ? b.prop('disabled', false) : b.prop('disabled', true)
}

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
  console.log(url)
}
