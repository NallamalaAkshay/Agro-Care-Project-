const User = require("../models/user"); 
const Product = require("../models/product");

exports.addToWishlist = async (req, res) => {
    try {
        const { userId } = req.params;
        const { productId } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        const existingWishlistItem = user.wishlist.find(item => item.product_id.toString() === productId);
        if (existingWishlistItem) {
            return res.status(400).json({ message: "Product already in wishlist" });
        }

        user.wishlist.push({ product_id: productId });
        await user.save();

        res.status(200).json({ message: "Product added to wishlist", wishlist: user.wishlist });
    } catch (error) {
        res.status(500).json({ message: "Failed to add to wishlist", error: error.message });
    }
};

exports.getWishlist = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate('wishlist.product_id');
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ wishlist: user.wishlist });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve wishlist", error: error.message });
    }
};

exports.removeFromWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.params;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.wishlist = user.wishlist.filter(item => item.product_id.toString() !== productId);

        await user.save();
        res.status(200).json({ message: "Product removed from wishlist", wishlist: user.wishlist });
    } catch (error) {
        res.status(500).json({ message: "Failed to remove product from wishlist", error: error.message });
    }
};
