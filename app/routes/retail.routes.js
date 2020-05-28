module.exports = (app) => {
    const product = require('../controllers/retail.controller.js');

    // Create a new Note
    app.post('/api/products', product.create);

    // Retrieve all Notes
    app.get('/api/products', product.findAll);

    // Retrieve a single Note with noteId
    app.get('/api/products/:productId', product.findOne);

    // Update a Note with noteId
    app.put('/api/products/:productId', product.update);

    // Delete a Note with noteId
    app.delete('/api/products/:productId', product.delete);
}


// module.exports = (function() {
//     'use strict';
//     const product = require('../controllers/retail.controller.js');
//     var externalRoutes = require('express').Router();
//     // Create a new Note
//     externalRoutes.post('/api/products', product.create);

//     // Retrieve all Notes
//     externalRoutes.get('/api/products', product.findAll);

//     // Retrieve a single Note with noteId
//     externalRoutes.get('/api/products/:productId', product.findOne);

//     // Update a Note with noteId
//     externalRoutes.put('/api/products/:productId', product.update);

//     // Delete a Note with noteId
//     externalRoutes.delete('/api/products/:productId', product.delete);

//     return externalRoutes;
// })();
   
    
