const express    = require('express')
const app        = express()
const path       = require('path')
const bodyParser = require('body-parser')
const md5        = require('md5')


app.use(express.static('public'))

app.set('port', process.env.PORT || 3000)
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.locals.folders = []
app.locals.urls    = []


app.get('/', (request, response) => {
  response.send('index.html')
})

app.get('/api/folders', (request, response) => {
  const { folders } = app.locals

  response.json({ folders })
})

app.post('/api/folders', (request, response) => {
  const { title } = request.body
  const id = app.locals.folders.length + 1

  app.locals.folders.push({id, title})
  response.status(201).json({id, title})
})

app.get('/api/urls', (request, response) => {
  const { urls } = app.locals

  response.json({ urls })
})

app.post('/api/urls', (request, response) => {
  const { name, url } = request.body

  app.locals.urls.push({ name, url })
  response.status(201).json({ name, url })
})


const server = app.listen(app.get('port'), () => {
  const port = server.address().port;
  console.log('Magic happens on port ' + port);
});
