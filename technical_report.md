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

This code sets up a basic server using node.js and express.js to handle HTTP Get requests for two different routes. When a get request is made to the root URL the server responds by sending the client.html which is a landing page for any users trying to use the site.

https://expressjs.com/en/guide/routing.html


**Middleware**

Middleware is a series of functions the HTTPS request runs through before reaching the routes endpoint handler. each middleware function in the stack can perform different actions on the request and response objects such as termination of the cycle or passing on control to the next function in the stack.

```JavaScript
// CORS - https://expressjs.com/en/resources/middleware/cors.html
const cors = require('cors')
app.use(cors())
```

I've utilized the CORS middleware package to handle cross-origin resource sharing. Facilitates cross-origin requests, allowing express applications to accept requests from different organizations, domains, and ports. This is good as it allows the sharing of resources in a secure manner across multiple different platforms.

https://medium.com/@knoldus/a-guide-to-cors-in-node-js-with-express-78eaff58a84e


**HTTP Responses and Handling Requests**

(HTTP responses supply the status codes that communicate the status of the request such as 200 for success and 404 for not found alongside this the headers and body of the content is sent over to supply the browser with useful information that is used to build the site in the correct manner. 40ish words)

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
```

(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)

(Provide reference urls to your sources of information about the feature - required)


Server Language Features
-----------------------

**Variable Declerations**

(Technical description of the feature - 40ish words)

```JavaScript
let expectedFields = ['user_id', 'keywords', 'description', 'image', 'lat', 'lon'];
const retrievedFields = Object.keys(req.body).toString().split(",");
```

(Declaring variables using const and let keywords - 40ish words)

(Provide reference urls to your sources of information about the feature - required)


**Functions**

(Using functions to define route handlers and middleware - 40ish words)

```JavaScript
app.post('/item/', (req, res) =>
app.use(express.json());
app.use(cors())
```

(Using functions to define route handlers and middleware - 40ish words)

(Provide reference urls to your sources of information about the feature - required)


Client Framework Features
-------------------------

**Data Binding**

(Vue's data binding (data() function in the component) binds data properties like attendees and attendees to the HTML template, enabling two-way data binding. - 40ish words)

```JavaScript
const RootComponent = {
          data() {
            return {
                attendee: {
                    id: '',
                    name: '',
                    notes: '',
                },
                attendees: [],
            }
          }
```
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)

(Provide reference URLs to your sources of information about the feature - required)


**Methods**

(Technical description of the feature - 40ish words)

```JavaScript
methods: {
            updateAttendees() {
                fetch(`${urlAPI}/attendees`, {
                })
                    .then(response => response.json())
                    .then(json => {this.attendees = json})
                .catch(err => console.error(err))
            },
            clearInput() {
                this.attendee = {...this.attendee, ...{
                    id: Math.random(),
                    name: undefined,
                    notes: undefined,
                }}
            },
            addAttendee() {
                fetch(`${urlAPI}/attendee`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(this.attendee),
                })
                    .then(response => response.json())
                    .then(()=>this.clearInput())
                    .then(()=>this.updateAttendees())
                .catch(err => console.error(err));
            },
            deleteAttendee(id) {
                fetch(`${urlAPI}/attendee/${id}`, {
                    method: 'DELETE',
                })
                    .then(()=>this.updateAttendees())
                .catch(err => console.error(err));
            }
          },
        }
```

(Vue methods (updateAttendees, clearInput, addAttendee, deleteAttendee) are defined within the component to perform specific actions like fetching data, adding new attendees, and deleting attendees - 40ish words)

(Provide reference urls to your sources of information about the feature - required)


**Lifecycle Hooks**

(Technical description of the feature - 40ish words)

```JavaScript

 created() {
            this.clearInput()
            this.updateAttendees()
          },

```

(Within the RootComponent, the created() hook is defined. Inside this hook, two methods are invoked: this.clearInput() and this.updateAttendees(). - 40ish words)


(Provide reference urls to your sources of information about the feature - required)


Client Language Features
------------------------

**Form**

(HTML forms are essential for collecting user data and submitting it to the server or handling it within the client-side code, facilitating various interactions within web applications. - 40ish words)

```HTML
<form>
    <!-- Input fields for user_id, lat, lon, image, keywords, and description -->
    <input name="user_id" placeholder="user_id">
    <input name="lat" placeholder="lat">
    <input name="lon" placeholder="lon">
    <input name="image" placeholder="image">
    <input name="keywords" placeholder="keywords">
    <textarea name="description" placeholder="description"></textarea>
    <button data-action="create_item">Create Item</button>
</form>
```
This <form> element is crucial for gathering user input. It encapsulates various input elements (such as text inputs and a textarea) along with a submit button (<button>). The form allows users to input data (like user_id, lat, lon, etc.) and submit it, which can trigger an action (like creating an item in your application). - 40ish words

(Provide reference urls to your sources of information about the feature - required)

**Object Literals**

(Technical description of the feature - 40ish words)

```JavaScript
const RootComponent = {
  data() {
    return {
        attendee: {
            id: '',
            name: '',
            notes: '',
        },
        attendees: [],
    }
```


(In the data() method of the Vue component (RootComponent), you're using object literals to define two objects: attendee and attendees. These objects have properties like id, name, and notes within the attendee object and an empty array within the attendees object. - 40ish words)


(Provide reference urls to your sources of information about the feature - required)



Conclusions
-----------

(justify why frameworks are recommended - 120ish words)

(justify which frameworks should be used and why 180ish words)
