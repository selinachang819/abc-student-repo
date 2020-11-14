const express = require('express')
const app = express()
const port = 3000

app.use(express.static("landing"))

// app.get('/', (req, res) => {
//   res.sendFile(__dirname +'/landing/index.html')
// })
app.get('/result', (req, res) => {
  console.log(req.query)
  let ans= req.query.answer;
  if (ans=="one") {
    res.send("Hooray! You are right!")
  } else if (ans=="two") {
    res.send("Try again next time!")
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
