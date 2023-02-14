const express = require('express');
const { getProducts, getProductId, saveProduct, updateProduct, deleteProduct }  = require('../api/ProductManager');

const router = express.Router();

//http://localhost:8080/api/products 
router.get('/', getProducts);

//http://localhost:8080/api/products/4
router.get('/:pid', getProductId);

//http://localhost:8080/api/products 
router.post('/', saveProduct);

//http://localhost:8080/api/products/6   Se debe actualizar junto a todos los campos enviados desde body
router.put('/:pid', updateProduct);

//http://localhost:8080/api/products/7
router.delete('/:pid', deleteProduct);

module.exports = router;