const express = require('express');
const { addToCart, getCart, updateCartItem, removeFromCart } = require('../controllers/cart.js');
const router = express.Router();

router.post('/users/:userId/cart', addToCart);

router.get('/users/:userId/cart', getCart);

router.put('/users/:userId/cart/:productId', updateCartItem);

router.delete('/users/:userId/cart/:productId', removeFromCart);

module.exports = router;
