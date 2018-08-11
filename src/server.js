const express = require('express')
const app = express()
var cors = require('cors')
var bodyParser = require('body-parser');
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var port = process.env.PORT || 3030;

var placeHolderEntries = [
    {   "time" : '216',
        "date" : "Thursday Nov 23, 2017 7:43 PM",
        "tldr" : "Thanksgiving with family",
        "full" : "some more message"},
    {   "time" : '423',
        "date" : "Friday Dec 24, 2017 11:34 PM",
        "tldr" : "Christmas Eve",
        "full" : "some other message"},
    {   "time" : '567',
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

app.post('/api/entries', function(req, res) {
    console.log(req.body)

    var timeOptions = {
        weekday : 'long',
        year : 'numeric',
        month : 'long',
        day : 'numeric',
        hour : 'numeric',
        minute : 'numeric',
        timeZoneName : 'short'
    }
    placeHolderEntries.push({
        "time" : req.body.time,
        "date" : new Date(req.body.time).toLocaleString('en-US', timeOptions),
        "tldr" : req.body.tldr,
        "full" : req.body.full
    });
    res.send({
        "status" : 200,
        "data" : "Successfully recieved new entry"
    });
});

app.delete('/api', function (req, res) {
    console.log(req.body)

    res.send('Got a DELETE request at /api')
})

app.listen(port);
console.log('Listening on port ' + port)
