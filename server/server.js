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
 res.sendFile('server.js', {root: __dirname})
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

let expectedFields = ['user_id', 'keywords', 'description', 'image', 'lat', 'lon'];

app.post('/item/', (req, res) => {
  const retrievedFields = Object.keys(req.body).toString().split(",");

  // Check if 'image' field was included and adjust the expected fields accordingly
  if (retrievedFields.includes('image')) {
    expectedFields.push('image');
  } else {
    expectedFields = expectedFields.filter(field => field !== 'image');
  }

  // Check if all expected fields are present and have non-empty values
  const missingOrEmptyFields = expectedFields.filter(field => !retrievedFields.includes(field) || !req.body[field]);

  if (missingOrEmptyFields.length > 0) {
    console.log("POST 405 - Missing or Invalid Fields");
    console.log(req.body);
    return res.status(405).json({ "message": "Missing or invalid fields: " + missingOrEmptyFields.join(', ') });
  }

  ITEMS.push(req.body);
  res.status(201).json(req.body);
});

app.get('/items/', (req, res) => {
  res.status(200).json(ITEMS)
})

app.get('/items/', (req, res) => {
  res.status(200).json(ITEMS)
})

app.delete('/item/:id', (req, res) => {
  const id = parseFloat(req.params.id);

  // Find the index of the item with the matching ID
  const index = ITEMS.findIndex(item => item.id === id);

  if (index !== -1) {
    // Item found, proceed with deletion
    ITEMS.splice(index, 1);
    res.status(204).json();
  } else {
    // Item not found, send 404 response
    res.status(404).json({ message: 'Item not found' });
  }
});


// Serve -----------------------------------------------------------------------

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// Docker container exit handler - https://github.com/nodejs/node/issues/4182
process.on('SIGINT', function() {process.exit()})