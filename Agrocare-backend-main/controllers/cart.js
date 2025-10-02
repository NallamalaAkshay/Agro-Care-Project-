const User = require("../models/user"); 
const Product = require("../models/product");

exports.addToCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const { productId, quantity } = req.body;

        if (quantity <= 0) {
            return res.status(400).json({ message: "Quantity should be a positive number" });
        }

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        const existingCartItem = user.cart.find(item => item.product_id.toString() === productId);

        if (existingCartItem) {
            existingCartItem.quantity += quantity;
        } else {
            user.cart.push({ product_id: productId, quantity });
        }

        await user.save();
        res.status(200).json({ message: "Product added to cart", cart: user.cart });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Failed to add to cart", error: error.message });
    }
};

exports.getCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate('cart.product_id');
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ cart: user.cart });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve cart", error: error.message });
    }
};

exports.updateCartItem = async (req, res) => {
    try {
        const { userId, productId } = req.params;
        const { quantity } = req.body;

        if (quantity <= 0) {
            return res.status(400).json({ message: "Quantity should be a positive number" });
        }

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const cartItem = user.cart.find(item => item.product_id.toString() === productId);
        if (!cartItem) return res.status(404).json({ message: "Product not found in cart" });

        cartItem.quantity = quantity;

        await user.save();
        res.status(200).json({ message: "Cart item updated", cart: user.cart });
    } catch (error) {
        res.status(500).json({ message: "Failed to update cart item", error: error.message });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.params;
        console.log(productId);
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });
        user.cart.map(item => console.log(item.product_id))
        user.cart = user.cart.filter(item => item.product_id.toString() !== productId);
        await user.save();
        res.status(200).json({ message: "Product removed from cart", cart: user.cart });
    } catch (error) {
        res.status(500).json({ message: "Failed to remove product from cart", error: error.message });
    }
};
 