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




// URL STUFF


$('.create-url-btn').on('click', (e) => {
  e.preventDefault()

  let name = $('.site-name-input').val()
  let url = $('.url-input').val()
  if(validateUrl(url) == false) {
    console.log('false');
  }
  else {
    let result = addHTTP(url)
    postURL(name, result)
  }
})

function postURL(name, url) {
  fetch('/api/urls', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': name,
      'url': url
    })
  })
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(e => console.log(e))
}

function addHTTP(url) {
  if(!/^(f|ht)tps?:\/\//i.test(url)) {
    url = "http://" + url;
  }
  return url;
}

function validateUrl(url) {
  var res = url.match(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/)
  if(res ) {
    return true;
  }
  else {
    return false
  }
}



