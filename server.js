const express    = require('express')
const app        = express()
const path       = require('path')
const bodyParser = require('body-parser')
const md5        = require('md5')
const favicon    = require('serve-favicon')

const environment   = 'development'
const configuration = require('./knexfile')[environment]
const database      = require('knex')(configuration)


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
      response.status(200).json(folders)
    })
    .catch(e => console.log(e))
})
//
// app.post('/api/v1/folders', (request, response) => {
//   const folder = request.body
//
//   database('folders').insert(folder, 'id')
//     .then(id => {
//       console.log('id', id)
//       response.status(201).json({ id: folder[0] })
//     })
// })

app.post('/api/v1/folders', (request, response) => {
  const folder_name = request.body

  database('folders').insert(folder_name, 'id')
  .then(() => {
    database('folders').select()
    .then(folders => {
      console.log(folders);
      response.status(200).json(folders)
    })
  })
})

app.get('/api/v1/urls', (request, response) => {
  database('urls').select()
    .then(urls => {
      response.status(200).json(urls)
    })
    .catch(e => console.log(e))
})

app.post('/api/v1/urls', (request, response) => {
  const url = request.body

  database('urls').insert(url, 'id')
    .then(id => {
      console.log('id', id);
    })
    .catch(e => console.log(e))
})


const server = app.listen(app.get('port'), () => {
  const port = server.address().port;
  console.log('Magic happens on port ' + port);
});














