const express = require('express');
const bodyParser = require('body-parser');
//var request = require('request');
const dbConfig = require('./config/config.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


//import mongoose from 'mongoose';

var app = express(),
    port = 3070;




 const products = [
{title: 'Washing Machine', id: 1},
{title: 'Laptop', id: 2},
{title: 'Books', id: 3}
]

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse requests of content-type - application/json
app.use(bodyParser.json());
//app.use(app.router);
require('./app/routes/retail.routes.js')(app);
app.get("/", function(req, res) {
	request('https://redsky.target.com/v2/pdp/tcin/13860428?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics', function (error, response, body) {
    if (!error && response.statusCode == 200) {
    	//console.log(body.product.available_to_promise_network.product_id);
    	//console.log(body.product.available_to_promise_network.product_description.title);
    	var obj = JSON.parse(body);
    	console.log(obj.product.available_to_promise_network.product_id);
    	console.log(obj.product.item.product_description.title);
        res.send(body) // Print the google web page.
     }else{
res.send("Welcome to My Retail !!");
     }
})
   // res.send("Welcome to My Retail !!");
});

//comments

// app.get("/api/products", function(req, res) {
//     res.send(products);
// });

//CREATE Request Handler
//app.post('/api/products', (req, res)=> {
 
//console.log(req.body);
//	res.send(req.body);
// var product = {
// id: products.length + 1,
// title: req.body.title
// };
// products.push(product);
//});

// app.put('/api/products/:id', (req, res) => {
// var product = products.find(c=> c.id === parseInt(req.params.id));
// if (!product) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Not Found!! </h2>');
 
//  console.log(req.body.title);
// product.title = req.body.title;
// res.send(product);
// });

// app.get('/api/products/:id', (req, res) => {
// var product = products.find(c => c.id === parseInt(req.params.id));
 
// if (!product) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Ooops... Cant find what you are looking for!</h2>');
// res.send(product);
// });

// //DELETE Request Handler
// app.delete('/api/products/:id', (req, res) => {
 
// const product = products.find( c=> c.id === parseInt(req.params.id));
// if(!product) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;"> Not Found!! </h2>');
 
// const index = products.indexOf(product);
// products.splice(index,1);
 
// res.send(product);
// });

//"product.available_to_promise_network.product_id"
//"product.available_to_promise_network.product_description.title

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    autoIndex: true
}).then(() => {
    console.log("Successfully connected to the database");   
//     app.listen(port, function(err) {
//      console.log("running server on from port:::::::" + port);
// }); 
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
   // process.exit();
});
require('./app/routes/retail.routes.js')(app);
app.listen(port, function(err) {
     console.log("running server on from port:::::::" + port);
}); 

