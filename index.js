const express = require('express')
const bodyParser = require('body-parser')

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
        ],
        answer: 0
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
app.use(bodyParser.urlencoded({ extended: false }))

//////////////////////////////////////////////
//////////////////////////////////////////////

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

app.get('/api/tests', (req, res) => {
  let result = Object.keys(tests)
  res.json(result)
})

app.get('/createtest', (req, res) => {
  res.sendFile(__dirname + '/views/create-test.html')
})

app.post('/createtest', (req, res) => {
  tests[req.body.testName] = {
    nameLc: req.body.testName
      .replace(/\s/g, "")
      .toLowerCase(),
    items: []
  }

  res.redirect(`/test/${tests[req.body.testName].nameLc}`)
})

app.get('/createitem/:testName', (req, res) => {
  res.sendFile(__dirname + '/views/create-item.html')
})

app.post('/createitem', (req, res) => {
  let arr = req.headers.referer.split('/')
  let testName = arr[arr.length - 1]
  for (let test in tests) {
    if (tests[test].nameLc === testName) {
      let answerBaseZero
      switch (req.body.answer) {
        case 'a':
          answerBaseZero = 0
          break
        case 'b':
          answerBaseZero = 1
          break
        case 'c':
          answerBaseZero = 2
          break
        case 'd':
          answerBaseZero = 3
          break
      }

      tests[test].items.push({
        "question": req.body.question,
        options: [
          req.body.optA,
          req.body.optB,
          req.body.optC,
          req.body.optD,
        ],
        answer: answerBaseZero
      })

      res.redirect('/createitem/' + testName)
    }
  }

})

app.get('/updateitem/:testName/:itemNumber', (req, res) => {
  res.sendFile(__dirname + '/views/update-item.html')
})

app.post('/updateitem/:testName/:itemNumber', (req, res) => {
  for (let test in tests) {
    if (tests[test].nameLc === req.params.testName) {
      let item = tests[test].items[req.params.itemNumber - 1]
      item.question = req.body.question
      item.options = []
      item.options.push(req.body.optA)
      item.options.push(req.body.optB)
      item.options.push(req.body.optC)
      item.options.push(req.body.optD)

      let answer
      switch (req.body.answer) {
        case 'a':
          answer = 0
          break
        case 'b':
          answer = 1
          break
        case 'c':
          answer = 2
          break
        case 'd':
          answer = 3
          break
      }
      item.answer = answer

      break
    }
  }

  res.redirect(`/test/${req.params.testName}`)
})

app.get('/deleteitem/:testName/:itemNumber', (req, res) => {
  for (let test in tests) {
    if (tests[test].nameLc === req.params.testName) {
      tests[test].items.splice(req.params.itemNumber - 1, 1)
    }
  }

  res.redirect('/test/' + req.params.testName)
})

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
