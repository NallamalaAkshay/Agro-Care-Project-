const express = require('express');
const { 
    getAdminProfile, 
    updateAdminProfile, 
    getAllUsers, 
    deleteUser, 
    getAllProducts, 
    createProduct, 
    updateProduct, 
    changeUserRole
} = require('../controllers/admin.js');
// Middleware to ensure admin access

const router = express.Router();

// Admin Profile Management
router.get('/admin/profile',  getAdminProfile);
router.put('/admin/profile',  updateAdminProfile);

// User Management (Admin Only)
router.get('/admin/users', getAllUsers);
router.delete('/admin/users/:userId',  deleteUser);

// Product Management (Admin Only)
router.get('/admin/products',  getAllProducts);
router.post('/admin/products',  createProduct);
router.put('/admin/products/:productId',  updateProduct);
router.put('/admin/users/:userId/role', changeUserRole);
router.delete('/admin/users/:userId',  deleteUser);

module.exports = router;
 