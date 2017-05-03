const express    = require('express')
const app        = express()
const path       = require('path')
const bodyParser = require('body-parser')
const md5        = require('md5')

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);


app.use(express.static('public'))

app.set('port', process.env.PORT || 3000)
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', (request, response) => {
  response.send('index.html')
})

app.get('/api/v1/folders', (request, response) => {
  database('folders').select()
    .then(folders => {
      response.status(200).json(folders)
    })
    .catch(error => {
      console.error('error: ', error)
    });
})

app.post('/api/v1/folders', (request, response) => {
  const title = request.body

  database('folders').insert(title, 'id')
    .then(folder => {
      response.status(201).json({ id: folder[0] })
    })
    .catch(error => {
      console.error('error: ', error)
    })
})

app.get('/api/v1/urls', (request, response) => {
  database('urls').select()
    .then(urls => {
      response.status(200).json(urls);
    })
    .catch(error => {
      console.error('error: ', error)
    })
})

app.post('/api/v1/urls', (request, response) => {
  const name  = request.body
  const url  = request.body
  // const folderID = request.body

  database('urls').insert( url, 'id')
    .then( url => {
      response.status(201).json({ id: url[0] })
    })
    .catch(error => {
      console.error('error: ', error)
    })
})

const server = app.listen(app.get('port'), () => {
  const port = server.address().port;
  console.log('Magic happens on port ' + port);
});
