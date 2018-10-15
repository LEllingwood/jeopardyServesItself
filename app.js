const HTTPClient = require('./httpClient.js'); //http client is the file that handles axios; has the client functionality. points to exported contents of the file.  "require" makes something available.  the only function getting called here is require.  it's getting httpClient.js available.
const port = 3000;
const fs = require('fs'); //makes the file system module available
const express = require('express');//part of pattern. gets express module
const app = express();//part of pattern. call that function. class is express; app is instance of express (sever; express is the server).
// const categories = require ('./categories.json')
app.use(express.json()) //.JSON is used with network requests (you're not getting back a json object) .JSON does more than .stringify or .parse.  it does that, plus other stuff.
app.use(express.static("./public")) //app.use is used to load middleware, middleware being the functionaility that we want to add to the server.  this adds the directory that includes the game.  express.static takes a directory and says "yo, this is your root and it's gonna get served."  serves the jeopardy game. hoist and serve
const url = 'http://jservice.io/api/category?id=';
// const categoriesArray = [67, 780, 277, 223, 184, 680, 21, 309, 582, 267, 136, 249, 105, 770, 508, 561, 420, 37, 1195, 25, 897];
const categoriesArray = [67, 780, 227, 223, 184, 680, 21, 309, 582, 267];

const categoryPromises = categoriesArray.map(id => HTTPClient(url + id))
// still need lines 9-12 because the server will still get the information from jservice, which the server will then turn around and provide to it the front end.  line 12 is returning a new array where it's done something with each element (original array says intact).  each element in the categories array is passed into the httpclient(the axios file)  sends each id through the httpclient.  it gets back a promise (not actual data) 

async function initJsonFile(){
    await Promise.all(categoryPromises)
    .then(categories => fs.writeFileSync("./data/categories.json", JSON.stringify(categories, null, 4)))
}

initJsonFile()
// this is the function that creates the categories file
app.get('/api/category/:id', (req, res) => {
    const json = fs.readFileSync("./data/categories.json")
    const categoriesObjectArray = JSON.parse(json)
    // takes the returned information and parses it.
    console.log(req.params.id);
    const requestedCategory = categoriesObjectArray.find(category => category.id == req.params.id) //
    // console.log("requested category:\n", requestedCategory);
    res.send(requestedCategory)
    
})
// 23-34 tells the server how to respond to GET requests from anyone to the server.  categoriesObject 
app.listen(port, ()=> console.log('ahhhhhhh, the server is serving'));


// app.get tells the server how to respond when it gets a GET request.  see lin, 14.  :id creates a variable.  (can also use query strings: ?id=.  this is the other way of doing it.)  that variable needs to be referenced specifically in request.params.id.  that's how you get access to the path variables--how you get the response.