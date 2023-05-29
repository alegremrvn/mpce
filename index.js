const express = require('express')
const app = express()
const PORT = 3000

app.use('/dist', express.static(__dirname + '/dist'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

app.use((req, res) => {
  res.send('Not found')
})

app.listen(PORT, () => {
  console.log(`Now listening at ${PORT}.`)
})
