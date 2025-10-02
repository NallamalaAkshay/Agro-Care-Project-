const Product = require('../models/product'); // Import the Product model
const fs = require('fs');
const path = require('path');

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Import products from JSON file
exports.importProducts = async () => {
    const filePath = path.join(__dirname, '../data/products.json');
    try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        await Product.insertMany(data);
        console.log("Data successfully inserted into MongoDB");
    } catch (error) {
        console.error("Error inserting data:", error.message);
    }
};

// Get top-rated products
exports.getTopRatedProducts = async (req, res) => {
    try {
        const topRatedProducts = await Product.find()
            .sort({ rating: -1 }) // Sort by rating in descending order
            .limit(5); // Limit the results to the top 5 products

        res.status(200).json(topRatedProducts);
        console.log(topRatedProducts)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a review to a product
exports.addReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, text, rating } = req.body;
        console.log(id)

        if (!text || !rating || rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Invalid review data. Rating must be between 1 and 5.' });
        }

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Add review
        const newReview = {
            user: userId,
            text,
            rating,
            createdAt: new Date(),
        };

        product.reviews.push(newReview);

        // Update product rating and number of reviews
        product.numReviews = product.reviews.length;
        product.rating =
            product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.numReviews;

        await product.save();

        res.status(201).json({ message: 'Review added successfully', review: newReview });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
