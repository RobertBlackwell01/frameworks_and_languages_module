Technical Report
================
Introduction: 

This is my technical report, a continuation of assignment 1 for frameworks and languages. In this technical report, I intend to critique both server and client prototypes that Freecycle has provided. 
To do this I will take code snippets of each component and highlight key elements that I believe could be improved on or written another way. During this process, I will explain why the pattern chosen is problematic covering multiple factors such as efficiency and ease of use. After covering Server and client prototypes using the structure below, I will cover the solution I created using frameworks. I will cover 3 features for each framework elaborating on how I have used it and its effectiveness. And to finalize this report I will justify using the evidence I have used in the report itself and why frameworks are good and should be used in most cases.


Critique of Server/Client prototype
---------------------

### Overview

The Server and client prototypes were both written without the use of frameworks. This isn't good because the amount of code needed to write minor elements of design and development is much higher than the need with server frameworks. I will now critique the prototype providing explanations as to why the code snippets have issues.

### Parse Request

```python
def parse_request(data):
    r"""
    >>> parse_request(b'GET /?key1=value1&key2=value2 HTTP/1.1\r\nHost: localhost:8000\r\nUser-Agent: curl/7.68.0\r\nAccept: */*\r\n\r\n')
    {'method': 'GET', 'path': '/', 'version': '1.1', 'query': {'key1': 'value1', 'key2': 'value2'}, 'host': 'localhost:8000', 'user-agent': 'curl/7.68.0', 'accept': '*/*', 'body': ''}
    >>> parse_request(b'Not a http request')
    Traceback (most recent call last):
    app.http_server.InvalidHTTPRequest: Not a http request
    """
    data = data.decode('utf8')
    match_header = RE_HTTP_HEADER.search(data)
    if not match_header:
        log.error(data)
        raise InvalidHTTPRequest(data)
    request = match_header.groupdict()
    request['query'] = {}
    path_query = request['path'].split('?', maxsplit=1)
    if (len(path_query) == 2):
        request['path'], request['query'] = path_query
        request['query'] = {k: '|'.join(v) for k,v in urllib.parse.parse_qs(request['query']).items()}
    for header in RE_HTTP_HEADER_KEY_VALUE.finditer(data):
        key, value = header.groupdict().values()
        request[key.lower()] = value
    request.update(RE_HTTP_BODY.search(data).groupdict())
    log.debug(request)
    return request

```
HTTP parsing is problematic because it assumes requests are always exactly as they should be and follow the correct formats. This leads to issues with incorrect requests, nonstandard methods, and varying HTTPS versions. Which causes unreliable parsing and errors.

### encode response

```python

def encode_response(response):
    r"""
    >>> encode_response({'body': '<html></html>'})
    b'HTTP/1.0 200 OK\r\nContent-type: text/html; charset=utf-8\r\nServer: CustomHTTP/0.0 Python/3.9.0+\r\nAccess-Control-Allow-Origin: *\r\nContent-Length: 13\r\n\r\n<html></html>'
    """
    response = {**RESPONSE_DEFAULTS, **response}
    log.debug(response)
    code = response.pop('code')
    head = f"HTTP/1.0 {code} {RESPONSE_CODES[code]}".encode('utf8')
    body = response.pop('body')
    if isinstance(body, str):
        body = body.encode('utf8')
    response['Content-Length'] = len(body)
    return RESPONSE_SEPARATOR.join((
        head,
        RESPONSE_SEPARATOR.join(
            f'{k}: {v}'.encode('utf8')
            for k, v in response.items()
        ),
        b'',
        body,
    ))
```

This is an issue as hardcoding the HTTP version limits its compatibility. With the incorrect response code the chances of errors are more apparent but assuming the correct UTF-8 encoding for the content length can be handled incorrectly which would lead to parsing failures and incorrect error codes displayed.

### Recommendation

This implementation should not be used outside of this environment due to many reasons. Firstly the security risks. There will be security issues with improper handling of the user inputs which exposes them to potential attacks. The implementation does also not fully implement various aspects of the HTTP protocol such as chunked transfer encoding or different versions of HTTP. There is also a lack of error handling which would lead to more issues debugging but also maintaining the prototype. The example also does not manage partial incorrect requests effectively which will make the prototype perform incorrectly. Due to this, the server will have issues handling large requests due to the way it has been built which will also affect the performance and scalability.

Django would be the best option for handling HTTP requests as it provides extensive built-in functions as well as robust security features, great request processing, and more scalability options. Django would also reduce the development time as it's fairly straightforward in comparison to custom implementations like the prototype.


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

**Arrow Functions**

In JavaScript arrow functions make it easier to write functions by using less code. They also solve problems when it comes to the "this" keyword function which can be found in traditional functions. Arrow functions are great for callbacks and working with array methods.

```JavaScript

 updateAttendees() {
                fetch(`${urlAPI}/attendees`, {
                })
                    .then(response => response.json())
                    .then(json => {this.attendees = json})
                .catch(err => console.error(err))
            },
```
In this example, I've used arrow functions to maintain the correct context from the Vue instance and ensure that the "this.attendees" are updated correctly. The use of arrow functions also helps maintain the readability of the code and avoids common issues.




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
