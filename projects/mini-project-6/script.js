const express = require('express')
const app = express()
const port = 3000

let words=[];


app.use(express.static("public"))

// app.get('/', (req, res) => {
//   res.sendFile(__dirname +'/landing/index.html')
// })
app.get('/result', (req, res) => {
  let ans=req.query.answer;
  if (ans=="leo") {
    res.sendFile(__dirname +"/public/right/index.html")
  }
  else{
    res.sendFile(__dirname +"/public/wrong/index.html")
  }
})

app.get('/relay', (req, res) => {
  let word=req.query.word;
  words.push(word);
  console.log(words);
  res.json({relayWords:words});
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
