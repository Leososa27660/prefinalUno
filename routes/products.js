const express = require('express');
const { getProducts, getProductId, saveProduct, updateProduct, deleteProduct }  = require('../api/products');

const router = express.Router();

//  http://localhost:8080/api/products 
router.get('/', getProducts);

// http://localhost:8080/api/products/8
router.get('/:pid', getProductId);

// http://localhost:8080/api/products 
router.post('/', saveProduct);

//http://localhost:8080/api/products/2  
router.put('/:pid', updateProduct);

//http://localhost:8080/api/products/9
router.delete('/:pid', deleteProduct);

module.exports = router;
