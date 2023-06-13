var express = require('express');
var router = express.Router();

var ProductService = require('../services/ProductService');

router.get('/all', ProductService.getAllProducts);
router.get('/search', ProductService.searchProduct);
router.get('/:id', ProductService.getProduct);
router.post('/', ProductService.addProduct);
router.put('/:id', ProductService.updateProduct);

module.exports = router;