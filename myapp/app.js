const express = require('express')
const app = express()
const port = 8000

app.get('/', (req, res) => { // https://expressjs.com/en/starter/hello-world.html
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(` listening on port ${port}`)
})