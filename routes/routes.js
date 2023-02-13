const express = require('express');
const productsRoutes = require('./products');
const cartsRoutes = require('./carts');
    
const router = express.Router();

router.use('/products', productsRoutes);
router.use('/carts', cartsRoutes);

module.exports = router;