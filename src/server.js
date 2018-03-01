const express = require('express')
const app = express()

app.get('/api/hello', function (req, res) {
  res.send({ express: 'Hello From Express' })
})

app.post('/', function (req, res) {
  res.send('Got a POST request')
})

app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user')
})

app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user')
})

app.listen(3030, () => console.log('Listening on port 3030!'))
