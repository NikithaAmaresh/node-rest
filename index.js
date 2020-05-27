const express = require('express');
const bodyParser = require('body-parser');
var app = express(),
    port = 3070;

 const products = [
{title: 'Washing Machine', id: 1},
{title: 'Laptop', id: 2},
{title: 'Books', id: 3}
]

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

app.get("/", function(req, res) {
    res.send("Welcome to My Retail !!");
});

app.get("/api/products", function(req, res) {
    res.send(products);
});

//CREATE Request Handler
app.post('/api/products', (req, res)=> {
 

var product = {
id: products.length + 1,
title: req.body.title
};
products.push(product);
res.send(product);
});

app.put('/api/products/:id', (req, res) => {
var product = products.find(c=> c.id === parseInt(req.params.id));
if (!product) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Not Found!! </h2>');
 
 console.log(req.body.title);
product.title = req.body.title;
res.send(product);
});

app.get('/api/products/:id', (req, res) => {
var product = products.find(c => c.id === parseInt(req.params.id));
 
if (!product) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Ooops... Cant find what you are looking for!</h2>');
res.send(product);
});

//DELETE Request Handler
app.delete('/api/products/:id', (req, res) => {
 
const product = products.find( c=> c.id === parseInt(req.params.id));
if(!product) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;"> Not Found!! </h2>');
 
const index = products.indexOf(product);
products.splice(index,1);
 
res.send(product);
});

app.listen(port, function(err) {
     console.log("running server on from port:::::::" + port);
});