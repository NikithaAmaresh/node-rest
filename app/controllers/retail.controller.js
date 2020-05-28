const Product = require('../model/retail.model.js');

var request = require('request');
 const products = [
{title: 'Washing Machine', id: 1},
{title: 'Laptop', id: 2},
{title: 'Books', id: 3}
]

/**
* @module retail
* @function Create and save a new product
* @param req {Object} The request.
* @param res {Object} The response.
* @return res {Object} The list of all products
*/
exports.create = (req, res) => {
	/*var product = {
	id: products.length + 1,
	title: req.body.title
	};
	products.push(product);
	res.send(product);*/
	console.log(req.body);
	//res.send(req.body);
	 if(!req.body.product_id) {
        return res.status(400).send({
            message: "Product Id can't be empty"
        });
    }

    // Create a Note
    var product = new Product({
    	product_id : req.body.product_id,
        value: req.body.value, 
        currency_code: req.body.currency_code
    });

    // Save product in the database
    product.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Product."
        });
    });
};

/**
* @module retail
* @function Retrieve and return all products from the database.
* @param req {Object} The request.
* @param res {Object} The response.
* @return res {Object} The list of all products
*/
exports.findAll = (req, res) => {
  //res.send(products);
   Product.find()
    .then(products => {
        res.send(products);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving products."
        });
    });
};

/**
* @module retail
* @function Find a single product with a productId
* @param req {Object} The request.
* @param res {Object} The response.
* @return res {Object} The list of all products
*/
// Find a single note with a noteId
exports.findOne = (req, res) => {
	console.log("=Find One=");
	/*var product = products.find(c => c.id === parseInt(req.params.id));
 
	if (!product) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Ooops... Cant find what you are looking for!</h2>');
    res.send(product);*/
    request('https://redsky.target.com/v2/pdp/tcin/13860428?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics', function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	    	//console.log(body.product.available_to_promise_network.product_id);
	    	//console.log(body.product.available_to_promise_network.product_description.title);
	    	var obj = JSON.parse(body);
	    	console.log(obj.product.available_to_promise_network.product_id);
	    	console.log(obj.product.item.product_description.title);
	    	var responseObj = {};
	    	responseObj.id = obj.product.available_to_promise_network.product_id;
	    	responseObj.name = obj.product.item.product_description.title;
	    	Product.find({product_id:responseObj.id})
				    .then(product => {
				        if(!product[0]) {
				            return res.status(404).send({
				                message: "Note not found with id " + responseObj.id
				            });            
				        }
				        console.log(product[0]);
				        responseObj.current_price = {};
				        responseObj.current_price.value = product[0].value;
				        responseObj.current_price.currency_code = product[0].currency_code;

				        res.send(responseObj);
				    }).catch(err => {
				        if(err.kind === 'ObjectId') {
				            return res.status(404).send({
				                message: "Note not found with id " + responseObj.id
				            });                
				        }
				        return res.status(500).send({
				            message: "Error retrieving note with id " + responseObj.id
				        });
				    });
	     }else{
	     	res.send("Sorry No matching product found");
	     }
	})
    

};

/**
* @module retail
* @function Update a note identified by the product id in the request
* @param req {Object} The request.
* @param res {Object} The response.
* @return res {Object} The list of all products
*/
exports.update = (req, res) => {
	// var product = products.find(c=> c.id === parseInt(req.params.id));
	// if (!product) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Not Found!! </h2>');
	 
	//  console.log(req.body.title);
	// product.title = req.body.title;
	// res.send(product);
	console.log(req.params)
	if(!req.body) {
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }
    var id = req.params.productId;
    Product.update({product_id:"13860428"}, { $set: { value: req.body.value } })
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.productId
            });                
        }
        console.log(err);
        return res.status(500).send({
            message: "Error updating product with id " + req.params.productId
        });
    });
}

/**
* @module retail
* @function Create and save a new product
* @param req {Object} The request.
* @param res {Object} The response.
* @return res {Object} The list of all products
*/
// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
	 // var product = products.find( c=> c.id === parseInt(req.params.id));
	 // if(!product) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;"> Not Found!! </h2>');
	 
	 // const index = products.indexOf(product);
	 // products.splice(index,1);
	 
	 // res.send(product);

};

var fetchRetailInfo = () => {
	
}