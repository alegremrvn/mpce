const express = require('express')
const app = express()
const PORT = 3000

const tests = {
  "Plumbing Code": {
    nameLc: 'plumbingcode',
    items: [
      {
        "question": "Aside from the number of fixture units connected to it, the size of the (something i cant read) piping is determined by its",
        "options": [
          "length",
          "slope",
          "change in direction",
          "orientation",
        ],
        "answer": 0
      },
      {
        "question": "The curb or threshold of a shower may be eliminated",
        "options": [
          "to comply with accessibility standards",
          "for gang showers",
          "in hospitals only",
          "if so desired for safety",
        ],
        "answer": 0
      },
      {
        "question": "What is the PRC resolution number issued by the Board of Master Plumbing for the adoption and promulgation of the revised National Plumbing Code of the Philippines?",
        "options": [
          "Res. No. 962",
          "Res. No. 2",
          "Res. No. 1378",
          "Res. No. 3",
        ]
      },
    ]
  },
  "Algebra": {
    nameLc: 'algebra',
    items: [
      {
        "question": "What is 1 + 1?",
        "options": [
          "1",
          "11",
          "b",
          "x",
        ]
      }
    ]
  }
}

//////////////////////////////////////////////
//////////////////////////////////////////////

app.use('/dist', express.static(__dirname + '/dist'))

//////////////////////////////////////////////
//////////////////////////////////////////////

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

app.get('/api/tests', (req, res) => {
  let result = Object.keys(tests)
  res.json(result)
})

app.get('/addtest', (req, res) => {
  res.sendFile(__dirname + '/views/addTest.html')
})

app.post('/addtest', (req, res) => {

  res.sendFile(__dirname + '/views/test.html')
})

// app.get('/plumbingcode', (req, res) => {
//   res.sendFile(__dirname + '/views/test.html')
// })

// app.get('/plumbingcodeitems', (req, res) => {
//   res.json(testItems['Plumbing Code'])
// })

app.get('/test/:testName', (req, res) => {
  res.sendFile(__dirname + '/views/test.html')
})

app.get('/api/items/:testNameLc', (req, res) => {
  let output
  for (let test in tests) {
    if (tests[test].nameLc === req.params.testNameLc) {
      res.json({
        testName: test,
        items: tests[test].items
      })
    }
  }
})

//////////////////////////////////////////////
//////////////////////////////////////////////

app.use((req, res) => {
  res.status(404)
    .type('text')
    .send('Not Found');
})

//////////////////////////////////////////////
//////////////////////////////////////////////

app.listen(PORT, () => {
  console.log(`Now listening at ${PORT}.`)
})
