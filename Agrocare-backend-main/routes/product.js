const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

router.post('/products', productController.createProduct);       // Create a new product
router.get('/products', productController.getAllProducts);       // Get all products
router.get('/products/:id', productController.getProductById);   // Get a single product by ID
router.put('/products/:id', productController.updateProduct);    // Update a product by ID
router.delete('/products/:id', productController.deleteProduct); // Delete a product by ID
router.post('/products/:id/reviews', productController.addReview);
router.get('/top-rated', productController.getTopRatedProducts);


module.exports = router;
