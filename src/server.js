const express = require('express')

const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.PORT || 3030

const placeHolderEntries = [
  {
    time: 1534272124247, date: 'Tuesday, August 14, 2018, 2:42 PM EDT', tldr: 'FD Sub 3', full: 'FD Full 3', attr: ['attr0', 'attr1']
  },
  {
    time: 1534272064244, date: 'Tuesday, August 14, 2018, 2:41 PM EDT', tldr: 'FD Sub 2', full: 'FD Full 2', attr: ['test']
  },
  {
    time: 1534272043877, date: 'Tuesday, August 14, 2018, 2:40 PM EDT', tldr: 'FD Sub 1', full: 'FD Full 1', attr: ['at0', 'at1', 'at2']
  },
  {
    time: 1534271979577, date: 'Tuesday, August 14, 2018, 2:39 PM EDT', tldr: 'FD Sub 0', full: 'FD Full 0', attr: []
  }
]

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' })
})

app.get('/api/entries', (req, res) => {
  res.send({ entries: placeHolderEntries })
})

app.get('/api/entry/:time', (req, res) => {
  const time = Number(req.params.time)
  let entryFound = null
  placeHolderEntries.map((entry) => {
    if (entry.time === time) {
      entryFound = entry
    }
    return placeHolderEntries
  })
  res.send({ entry: entryFound })
})

app.post('/api/entries', (req, res) => {
  placeHolderEntries.unshift(req.body)
  res.send({ message: 'Successfully recieved new entry' })
})

app.post('/api/entry/:time', (req, res) => {
  const time = Number(req.params.time)
  placeHolderEntries.map((entry) => {
    if (entry.time === time) {
      entry.tldr = req.body.tldr
      entry.full = req.body.full
      entry.attr = req.body.attr
    }
  })
  res.send({ message: 'Successfully updated entry' })
})

app.delete('/api/entry/:time', (req, res) => {
  const time = Number(req.params.time)
  let index
  for (let i = 0; i < placeHolderEntries.length; i += 1) {
    if (placeHolderEntries[i].time === time) {
      index = i
      break
    }
  }
  placeHolderEntries.splice(index, 1)
  res.send({ message: 'Successfully deleted entry' })
})

app.listen(port)
console.log(`Listening on port ${port}`)
