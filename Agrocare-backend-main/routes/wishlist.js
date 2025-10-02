const express = require('express');
const { addToWishlist, getWishlist, removeFromWishlist } = require('../controllers/wishlist');
const router = express.Router();

// Add a product to the wishlist
router.post('/users/:userId/wishlist', addToWishlist);

router.get('/users/:userId/wishlist', getWishlist);

// Remove a product from the wishlist
router.delete('/users/:userId/wishlist/:productId', removeFromWishlist);

module.exports = router;
