Technical Report
================
Introduction: 

This is my technical report, a continuation of assignment 1 for frameworks and languages. In this technical report, I intend to critique both server and client prototypes that have been provided by Freecycle. 
To do this I will take code snippets of each component and highlight key elements that I believe could be improved on and or written another way. During this process, I will explain why the pattern chosen is problematic covering multiple factors such as efficiency and ease of use. After covering both Server and client prototypes using the structure below, I will cover the solution I have created using frameworks. I will cover 3 features for each framework elaborating on how I have used it and its effectiveness. And to finalise this report I will justify using the evidence I have used in the report itself and why frameworks are good and should be used in most cases.

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

Routing in Express.js and node.js is the process of defining how an application responds to different requests from the client at different URLs (endpoints) with the use of specific HTTP methods including - get, post, and delete. It's a vital feature inside of Express that helps the application's backend logic by pre-determining and mapping the incoming requests to the appropriate handler functions.

```JavaScript
app.get('/', (req, res) => {
  res.sendFile('client.html', {root: __dirname})
})

app.get('/vue.js', (req, res) => {
 res.sendFile('server.js', {root: __dirname})
})
```

This feature firstly addresses and serves the need for basic web setup for client-side applications. It solves the problem of delivering a HTML landing page so that users can visually see a webpage when they visit the site. By utilizing node and express, it efferently can handle the HTTP GET requests which ensures that the end users get the desired resources that they require. As the setup is quick using this feature allows developers to great a visual webpage fast which creates a clear separation between the server and client-side resources. 

https://expressjs.com/en/guide/routing.html


**Middleware**
Middleware is a series of functions the HTTPS request runs through before reaching the routes endpoint handler. each middleware function in the stack can perform different actions on the request and response objects such as termination of the cycle or passing on control to the next function in the stack. 

```JavaScript 
// CORS - https://expressjs.com/en/resources/middleware/cors.html
 const cors = require('cors') 
app.use(cors()) ```
I’ve utilized the CORS middleware package to handle all the cross-origin resource sharing. This allows for my express application to accept requests from different domains, ports and much more. By enabling CORS, I can securely share resources across various platforms which makes my application more flexible and accessible for users from different devices and sources.
https://medium.com/@knoldus/a-guide-to-cors-in-node-js-with-express78eaff58a84e
**HTTP Responses and Handling Requests**
HTTP responses supply the status codes that communicate the status of the request such as 200 for success and 404 for not found alongside this the headers and body of the content are sent over to supply the browser with useful information that is used to build the site accurately.
```JavaScript
if (missingOrEmptyFields.length > 0) {
console.log("POST 405 - Missing or Invalid Fields");
console.log(req.body);
return res.status(405).json({ "message": "Missing or invalid fields:
" + missingOrEmptyFields.join(', ') });
}
ITEMS.push(req.body);
res.status(201).json(req.body);
});
app.get('/items/', (req, res) => {
res.status(200).json(ITEMS)
}) 
```
This feature addresses the problem of ensuring data integrity and validation when handling POST requests in my web application. Checking for missing and or empty fields in the inputted data is ensures that only valid and complete data is accepted and processed. Then in turn, if any data is missing or invalid my application responds with a 405 status and error message which prevents the invalid data from being added to the items array. The problem of invalid data being added to my array is solved by using this.
https://medium.com/@vitaliykorzenkoua/handling-requests-and-responses-innode-js-36ed725f6944

Server Language Features
-----------------------
**Variable Declarations**

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

I've utilized javas first class function to define route handlers and middleware for my express.js server. Middleware functions like the ones in my example are passed as paraments which enables Json parsing and CORS support. By using this feature of java script, I have ensure that the code remains modular which allows for more efficient data handling which enhances attainability and scalability.

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions


Client Framework Features
-------------------------

**Data Binding**

I've used Vue data binding which excels in seamless data transfer between the model which in this case is data and the UI. As two-way binding ensures that when the data is changed on one side it's automatically updated on either side.

```JavaScript
const Root Component = {
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
The problem of managing predictable and consistent initial states for data within this vue.js part. By defining the initial empty states for the items object and items array it ensures that the component starts with a known and controlled state. This prevents issues with undefined and or random values which can lead to errors. Having a pre-defined initial state helps ion manging item data more efficiently throughout the entire application.
https://v1.vuejs.org/guide/syntax.html

**Actions**

Actions are functions defined within the components to handle events. Methods can manipulate data and trigger UI updates alongside data binding.

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

In JavaScript Object literals are a syntax used for defining objects with a set of keys – value pairs. Object literals allow for structured initialization of data, capturing all related properties and methods. This allows for predictable state management.

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
