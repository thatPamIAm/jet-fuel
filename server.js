const express    = require('express')
const app        = express()
const path       = require('path')
const bodyParser = require('body-parser')
const md5        = require('md5')
const favicon    = require('serve-favicon')
// const redirect   = express.Router()

const environment   = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database      = require('knex')(configuration)
const moment        = require('moment')

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(express.static(path.join(__dirname, 'public')))
app.set('port', process.env.PORT || 3000)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (request, response) => {
  response.send('index.html')
})

app.get('/api/v1/folders', (request, response) => {
  database('folders').select()
    .then(papers => {
      response.status(200).json(papers);
    })
    .catch(e => console.log(e))
})

app.get('/api/v1/folders/:id', (request, response) => {
  database('folders').where('id', request.params.id).select()
    .then(folders => {
      response.status(200).json(folders);
    })
    .catch(e => console.log(e))
})

app.get('/api/v1/folders/:id/urls', (request, response) => {
  database('urls').where('folder_id', request.params.id).select()
    .then(folders => {
      // map through URLS , replace created_at with moment stuff
      response.status(200).json(folders)
    })
    .catch(e => console.log(e))
})

app.post('/api/v1/folders', (request, response) => {
  const folder_name = request.body

  database('folders').insert(folder_name, 'id')
  .then(() => {
    database('folders').select()
    .then(folders => {
      console.log(folders);
      response.status(201).json(folders)
    })
  })
})

app.get('/api/v1/urls', (request, response) => {
  database('urls').select()
    .then(urls => {
      // map through URLS , replace created_at with moment stuff
      response.status(200).json(urls)
    })
    .catch(e => console.log(e))
})

app.post('/api/v1/urls', (request, response) => {
  const url = request.body

  database('urls').insert(url ,[ "url_name","folder_id","long_url", "id", "visit_count"])
  // map through URLS , replace created_at with moment stuff
    .then((urls) => {
      response.status(201).json(urls[0])
    })
})

app.get('/:id', (request, response) => {
  const id = request.params.id
  database('urls').where('id', id).increment('visit_count', 1)
  .then(() => {
    return database('urls').where('id', id).select('long_url')
  })
  .then(match => {
    const {long_url} = match[0]
    console.log(long_url);
    response.redirect(`${long_url}`)
  })
})


const server = app.listen(app.get('port'), () => {
  const port = server.address().port;
  console.log('Magic happens on port ' + port);
});



// HELPERS
function formatTime(urls) {
  urls.map(url => {
    const created_at = moment(url.created_at).calendar()
    const updated_at = moment(url.updated_at).calendar()
    return Object.assign({}, url, { created_at, updated_at })
  })
}

module.exports = app


