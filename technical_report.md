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

HTTP responses supply the status codes that communicate the status of the request such as 200 for success and 404 for not found alongside this the headers and body of the content are sent over to supply the browser with useful information that is used to build the site accurately. 

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

As you can see from the code snippet the framework feature is handling post request first. Validation is the first section as the application wants to ensure there are no empty fields in the input data and would send the appropriate 405 if so. It also does the same for the items. However, there is a lack of error handling besides this which may cause problems when trying to update the items.

https://medium.com/@vitaliykorzenkoua/handling-requests-and-responses-in-node-js-36ed725f6944


Server Language Features
-----------------------

**Variable Declerations**

Fundamental for storing data values using the keywords var, let, and const to initialize the variable. Var is used for declaring. Variables can store different data types including numbers, strings and more using dynamic typing which means the variables can hold different types of data over time.

```JavaScript
let expectedFields = ['user_id', 'keywords', 'description', 'image', 'lat', 'lon'];
const retrievedFields = Object.keys(req.body).toString().split(",");
```

Declaring the retrieved fields as a const is beneficial as it ensures that the retrieved fields are always going to be the correct ones as the variable declaration of const prevents reassignment.

https://www.freecodecamp.org/news/var-let-and-const-whats-the-difference/


**Functions**

 I have used functions to define route handlers and middleware. Functions are components of the application that perform the desired tasks when called upon. Functions are also capable of accepting parameters and executing operations but not only that they are also capable of returning values when called upon.

```JavaScript
app.post('/item/', (req, res) =>
app.use(express.json());
app.use(cors())
```

By defining the route handlers it allows me to ensure specific actions when receiving the post request. I also have told the application to use middleware which is critical for handling the data across multiple different applications which in this instance for the server and client side is crucial.

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions


Client Framework Features
-------------------------

**Data Binding**

I've used vue data bidning which excels in seamless data transfer between the model which in this case is data and the UI. As two-way binding ensures that when the data is changed on one side it's automatically updated on either side.

```JavaScript
const RootComponent = {
          data() {
            return {
                items: {
                    id: '',
                    name: '',
                    notes: '',
                },
                items: [],
            }
          }
```
This defines initial empty states for the items object and also the array of items. This ensures that the starting point is predictable which helps to manage item data in the components this also ensures that the values are not random and or undefined.

https://v1.vuejs.org/guide/syntax.html


**Methods**

Methods are functions defined within the components to handle events. Methods can manipulate data and trigger UI updates alongside data binding.

```JavaScript
methods: {
            updateItems() {
                fetch(`${urlAPI}/items`, {
                })
                    .then(response => response.json())
                    .then(json => {this.items = json})
                .catch(err => console.error(err))
            },
            clearInput() {
                this.attendee = {...this.item, ...{
                    id: Math.random(),
                    name: undefined,
                    notes: undefined,
                }}
            },
            additem() {
                fetch(`${urlAPI}/items`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(this.item),
                })
                    .then(response => response.json())
                    .then(()=>this.clearInput())
                    .then(()=>this.updateItems())
                .catch(err => console.error(err));
            },
            deleteitem(id) {
                fetch(`${urlAPI}/items/${id}`, {
                    method: 'DELETE',
                })
                    .then(()=>this.items())
                .catch(err => console.error(err));
            }
          },
        }
```

I've defined the methods  within the component to perform specific actions like fetching data, adding new items, and deleting items. This is crucial as the client tests ensure  I have a working client side which allows me to add and remove items from the list.

https://v1.vuejs.org/guide/events.html


**Lifecycle Hooks**

Predefined methods are invoked at specific stages such as creation, mounting, and updating. These hooks allow me to execute custom logic or operations at specific moments.

```JavaScript

 created() {
            this.clearInput()
            this.updateitems()
          },

```

Withing the code snipped I've created the hook with two methods inside to clear input and update items


https://vuejs.org/guide/essentials/lifecycle


Client Language Features
------------------------

**Form**

HTML forms are essential for collecting user data and submitting it to the server or handling it within the client-side code, facilitating various interactions within web applications. Forms can also be used to collectively collect a sample of data which can be used as a sting to prepare an entire input form a user to send to the backend. Forms also have built-in validation to ensure the correct information is inputted.

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
This element is crucial for gathering user input. It encapsulates various input elements as seen in the code preview along with a submit button. The form allows users to input data  and submit it, which can trigger an action that then communicates with the backend to create and item inside of my application.

https://www.w3schools.com/html/html_forms.asp

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


In the data() method of the Vue component (RootComponent), I've used  object literals to define two objects: attendee and attendees. These objects have properties like id, name, and notes within the attendee object and an empty array within the attendees object. 


https://playcode.io/javascript/object-literal



Conclusions
-----------

I recommend frameworks as they streamline the developments by making little tasks very easy rather than writing multiple lines of code for one function already built into the framework. Also, frameworks provide more security as they come with more security features for the user to implement. Using frameworks also allows the user to make use of the pre-build templates that most frameworks offer. This streamlines development even more so as multiple features are all already written for the user. Using these templates also means that the code is written in the most efficient way ensuring the implementation has the most usability and scalability. 

I would recommend using both Vue.js and express.js as they're both fantastic frameworks for projects like these. Vue has a very simplistic and intuitive environment which for me made it very easy to follow the tutorials and develop a working front end. The ease of use was critical as I had to learn the framework in a short amount of time and had to ensure the quality of work was still at the standard I was capable of. Much like vue - expressjs is also very minimal and a great addition to node.js with strengths in building efficient server-side applications its perfect for the client's desired needs, even though it is a very minimal framework its power is not limited in that sense also which makes its ideal for rest APIs. So in combination having vue as frontend and express for backend, they work very well with one another to create a cohesive development environment which capabilities of seamless data flow between the client and server side. Both frameworks are not also updated regularly they have active communities and developers that often help one another and share new resources.
