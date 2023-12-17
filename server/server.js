const express = require('express')
const app = express()
const port = 8000

// Init Express ----------------------------------------------------------------

app.use(express.json());  // Enable json input from incoming requests. This is accessible from `req.body`

// CORS - https://expressjs.com/en/resources/middleware/cors.html
const cors = require('cors')
app.use(cors())

// Routes ----------------------------------------------------------------------

app.get('/', (req, res) => {
  res.sendFile('client.html', {root: __dirname})
})

app.get('/vue.js', (req, res) => {
 res.sendFile('vue.js', {root: __dirname})
})

ITEMS = [
     {
        "id": 1,
        "user_id": "user1234",
        "keywords": ["hammer", "nails", "tools"],
        "description": "A hammer and nails set",
        "lat": 1,
        "lon": 1,
        "date_from": "2021-11-22T08:22:39.067408",
     }
]

app.post('/item/', (req, res) => {
  if (Object.keys(req.body).sort().toString() != "id","user_id","keywords","description","lat","lon","date_from") {
    return res.status(405).json({message: 'missing fields'})
  }
  ITEMS.push(req.body)
  res.status(201).json(req.body)
})

app.get('/items/', (req, res) => {
  res.status(200).json(ITEMS)
})

app.delete('/item/:id', (req, res) => {
  const id = parseFloat(req.params.id)
  ITEMS = ITEMS.filter((item)=>item.id != id)
  res.status(204).json()
  // TODO: implement 404?
})


// Serve -----------------------------------------------------------------------

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

/*
// https://expressjs.com/en/guide/error-handling.html
function logErrors (err, req, res, next) {
  console.error(err.stack)
  next(err)
}
app.use(logErrors)
app.use(function(req, res, next){
  console.log('no route', req.originalUrl);
  res.status(404).type('txt').send('Not found');
  next()
})
*/

// Docker container exit handler - https://github.com/nodejs/node/issues/4182
process.on('SIGINT', function() {process.exit()})