const mongoose = require("mongoose");
const { Schema, Types } = mongoose; // Import Types for ObjectId

const ReviewSchema = new Schema({
    user: { 
        type: Types.ObjectId, 
        ref: 'User', 
        required: true 
    }, // Reference to the user who wrote the review
    text: { 
        type: String, 
        required: true, 
        trim: true 
    }, // Review text
    rating: { 
        type: Number, 
        required: true, 
        min: 1, 
        max: 5 
    }, // Rating between 1 and 5
    createdAt: { 
        type: Date, 
        default: Date.now 
    } // Timestamp for the review
});

const ProductSchema = new Schema({
    name: { 
        type: String, 
        required: true, 
        trim: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    currency: { 
        type: String, 
        default: 'USD' 
    },
    farmer_id: { 
        type: String, 
        required: true 
    },
    location: { 
        type: String, 
        required: true 
    },
    stock: { 
        type: Number, 
        required: true, 
        default: 0 
    },
    unit: { 
        type: String, 
        required: true 
    },
    harvest_date: { 
        type: Date, 
        required: true 
    },
    shipping_cost: { 
        type: Number, 
        default: 0 
    },
    category: { 
        type: String, 
        required: true 
    },
    image: { 
        type: String, 
        required: true 
    },
    brand: { 
        type: String, 
        required: true 
    },
    rating: { 
        type: Number, 
        default: 0 
    },
    numReviews: { 
        type: Number, 
        default: 0 
    },
    specifications: { 
        type: Map, 
        of: String 
    },
    reviews: [ReviewSchema] // Array of embedded reviews
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);
