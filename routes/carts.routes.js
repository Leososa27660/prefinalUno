const express = require('express');
const { createCart, showProducts, addProduct }  = require('../api/Carts');


const router = express.Router();

//http://localhost:8080/api/carts
router.post('/', createCart); 
//http://localhost:8080/api/carts/8
router.get('/:cid', showProducts);
//http://localhost:8080/api/carts/8/product/7
router.post('/:cid/product/:pid', addProduct);

module.exports = router;