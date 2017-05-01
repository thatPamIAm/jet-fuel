const express = require('express');
const app     = express();
const path    = require('path');


app.use(express.static('public'))

app.set('port', process.env.PORT || 3000)
app.use(express.static(path.join(__dirname, 'public')))


app.locals.folders = []
app.locals.urls    = []


app.get('/', (request, response) => {
  response.send('index.html')
})

const server = app.listen(app.get('port'), function() {
  const port = server.address().port;
  console.log('Magic happens on port ' + port);
});