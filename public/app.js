const HTTPClient = require('./httpClient.js');
// const port = 3000;
const fs = require('fs');
const express = require('express');
const app = express();
const categories = require ('./categories.json')
app.use(express.json())
const url = 'http://jservice.io/api/category?id=';
const categoriesArray = [67, 780, 277, 223, 184, 680, 21, 309, 582, 267, 136, 249, 105, 770, 508, 561, 420, 37, 1195, 25, 897];

const categoryPromises = categoriesArray.map(id => HTTPClient(url + id))

// Promise.all(categoryPromises)
//     .then(categories =>
//         fs.writeFileSync('./categories.json', JSON.stringify(categories))
//     )

app.get('/api/category/:id', (req, res) => {
    console.log('inside app.get')
    const requestedCategory = categories.find(category => category.id == req.params.id)
    console.log(requestedCategory)
    res.send(requestedCategory)
    
})

app.listen(3000, ()=> console.log('ahhhhhhh'));


// app.use(express.static("jeopardy"))