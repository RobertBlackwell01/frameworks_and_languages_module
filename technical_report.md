Technical Report
================
Introduction: 

This is my technical report, a continuation of assignment 1 for frameworks and languages. In this technical report, I intend to critique both server and client prototypes that have been provided by Freecycle. 
To do this I will take code snippets of each component and highlight key elements that I believe could be improved on and or written another way. During this process, I will explain why the pattern chosen is problematic covering multiple factors such as efficiency and ease of use. After covering both Server and client prototypes using the structure below, I will cover the solution I have created using frameworks. I will cover 3 features for each framework elaborating on how I have used it and its effectiveness. And to finalise this report I will justify using the evidence  I have used in the report itself and why frameworks are good and should be used in most cases.

155 words


Critique of Server/Client prototype
---------------------

### Overview
The Server and client prototypes were both written without the use of frameworks. This isn't good because the amount of code needed to write minor elements of design and development is much higher than the need with server frameworks. I will now critique the prototype providing explanations as to why the code snippets have issues.

### (name of Issue 1)

(A code snippet example demonstrating the issue)
(Explain why this pattern is problematic - 40ish words)

### (name of Issue 2)

(A code snippet example demonstrating the issue)
(Explain why this pattern is problematic - 40ish words)

### Recommendation
(why the existing implementation should not be used - 40ish words)
(suggested direction - frameworks 40ish words)


Server Framework Features
-------------------------

**Routing**

Routing in Express.js is the process of defining how an application responds to different requests from the client at different URLs (endpoints) with the use of specific HTTP methods including - get, post, and delete. It's a vital feature inside of Express that helps the application's backend logic by pre-determining and mapping the incoming requests to the appropriate handler functions. 

```JavaScript
app.get('/', (req, res) => {
  res.sendFile('client.html', {root: __dirname})
})

app.get('/vue.js', (req, res) => {
 res.sendFile('server.js', {root: __dirname})
})
```

(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)

(Provide reference urls to your sources of information about the feature - required)


**Middleware**

Middleware is a series of functions the HTTPS request runs through before reaching the routes endpoint handler. each middleware function in the stack can perform different actions on the request and response objects such as termination of the cycle or passing on control to the next function in the stack.

```JavaScript
// CORS - https://expressjs.com/en/resources/middleware/cors.html
const cors = require('cors')
app.use(cors())
```

I've utilized the CORS middleware package to handle cross-origin resource sharing. Facilitates cross-origin requests, allowing express applications to accept requests from different organizations, domains, and ports.

(Provide reference urls to your sources of information about the feature - required)


**HTTP Responses and Handling Requests**

(Technical description of the feature - 40ish words)

```JavaScript

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
```

(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)

(Provide reference urls to your sources of information about the feature - required)


Server Language Features
-----------------------

### (name of Feature 1)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


### (name of Feature 2)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)



Client Framework Features
-------------------------

### (name of Feature 1)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


### (name of Feature 2)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


### (name of Feature 3)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


Client Language Features
------------------------

### (name of Feature 1)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)

### (name of Feature 2)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)



Conclusions
-----------

(justify why frameworks are recommended - 120ish words)
(justify which frameworks should be used and why 180ish words)
