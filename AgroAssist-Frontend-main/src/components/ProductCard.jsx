import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, addToCart }) => {
    if (!product) return null;

    const isHighestRated = product.rating >= 4.5; // Define a threshold for high ratings

    return (
        <div className="product-card max-w-xs bg-gradient-to-br from-white to-gray-100 border border-gray-200 rounded-xl shadow-lg overflow-hidden m-4 transition-transform transform hover:scale-105 hover:shadow-2xl">
            <Link to={`/product/${product._id}`} className="product-link block relative">
                <img
                    src={product.image}
                    alt={product.name}
                    className="product-image w-full h-56 object-cover transition-opacity duration-200 hover:opacity-90"
                />
                <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                    {product.category}
                </span>
                {isHighestRated && (
                    <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                        Highest Rated
                    </span>
                )}
                <div className="p-4">
                    <h3 className="product-name font-bold text-xl text-gray-800 mb-2">{product.name}</h3>
                    <p className="product-price text-indigo-600 font-semibold text-lg mb-1">{`$${product.price}`}</p>
                    <p className="product-brand text-sm text-gray-600 mb-1">{`Brand: ${product.brand}`}</p>
                    <p className="product-location text-sm text-gray-500 mb-3">{`Location: ${product.location}`}</p>
                    {product.rating > 0 && (
                        <div className="product-rating flex items-center mb-2">
                            <div className="flex items-center text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <polygon points="12 2 15 8.5 22 9 17 13.5 18 20 12 16.5 6 20 7 13.5 2 9 9 8.5"></polygon>
                                    </svg>
                                ))}
                            </div>
                            <p className="text-sm text-gray-600 ml-2">{`(${product.numReviews} reviews)`}</p>
                        </div>
                    )}
                </div>
            </Link>
            <button
                className="add-to-cart w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-2 rounded-b-xl hover:from-blue-600 hover:to-indigo-600 transition duration-300"
                onClick={() => {
                    console.log("Add to Cart clicked for:", product);
                    addToCart(product);
                }}
            >
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;
