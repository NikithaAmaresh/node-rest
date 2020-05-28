const Product = require('../model/retail.model.js');

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
* @function Retrieve and return all notes from the database.
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
* @function Create and save a new product
* @param req {Object} The request.
* @param res {Object} The response.
* @return res {Object} The list of all products
*/
// Find a single note with a noteId
exports.findOne = (req, res) => {
	var product = products.find(c => c.id === parseInt(req.params.id));
 
	if (!product) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Ooops... Cant find what you are looking for!</h2>');
    res.send(product);
};

/**
* @module retail
* @function Create and save a new product
* @param req {Object} The request.
* @param res {Object} The response.
* @return res {Object} The list of all products
*/
// Update a note identified by the noteId in the request
exports.update = (req, res) => {
	var product = products.find(c=> c.id === parseInt(req.params.id));
	if (!product) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Not Found!! </h2>');
	 
	 console.log(req.body.title);
	product.title = req.body.title;
	res.send(product);
};

/**
* @module retail
* @function Create and save a new product
* @param req {Object} The request.
* @param res {Object} The response.
* @return res {Object} The list of all products
*/
// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
	 var product = products.find( c=> c.id === parseInt(req.params.id));
	 if(!product) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;"> Not Found!! </h2>');
	 
	 const index = products.indexOf(product);
	 products.splice(index,1);
	 
	 res.send(product);
};