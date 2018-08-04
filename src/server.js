const express = require('express')
const app = express()
var cors = require('cors')

app.use(cors())

var port = process.env.PORT || 3030;

var placeHolderEntries = [
    {   "time" : 216,
        "date" : "Thursday Nov 23, 2017 7:43 PM",
        "tldr" : "Thanksgiving with family",
        "full" : "some more message"},
    {   "time" : 423,
        "date" : "Friday Dec 24, 2017 11:34 PM",
        "tldr" : "Christmas Eve",
        "full" : "some other message"},
    {   "time" : 567,
        "date" : "Saturday Jan 1, 2018 1:02 AM",
        "tldr" : "New Year's at home",
        "full" : "what do i even write in these things"}
  ]

app.get('/api/hello', function (req, res) {
  res.send({ express: 'Hello From Express' })
})

app.get('/api/entries', function (req, res) {
  res.send({ "entries" : placeHolderEntries})
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

app.listen(port);
console.log('Listening on port ' + port)
