const express = require('express')
const app = express()
var cors = require('cors')
var bodyParser = require('body-parser');
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var port = process.env.PORT || 3030;

var placeHolderEntries = [
  ]

app.get('/api/hello', function (req, res) {
    res.send({ express: 'Hello From Express' })
})

app.get('/api/entries', function (req, res) {
    res.send({ "entries" : placeHolderEntries})
})

app.get('/api/entry/:time', function (req, res) {
    var time = Number(req.params.time);
    var entryFound = null;
    placeHolderEntries.map(function(entry) {
        if (entry.time === time) {
            entryFound = entry;
        }
    });
    res.send({entry: entryFound});
})

app.post('/api/entries', function(req, res) {
    placeHolderEntries.unshift( req.body );
    res.send({ "message" : "Successfully recieved new entry" });
});

app.post('/api/entry/:time', function(req, res) {
    var time = Number(req.params.time);
    placeHolderEntries.map(function(entry) {
        if (entry.time === time) {
            entry.tldr = req.body.tldr;
            entry.full = req.body.full;
        }
    });
    res.send({ "message" : "Successfully updated entry" });
});

app.delete('/api', function (req, res) {
    console.log(req.body)

    res.send('Got a DELETE request at /api')
})

app.listen(port);
console.log('Listening on port ' + port)
