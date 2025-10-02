import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { baseURL } from '../lib';
import { UserContext } from '../userContext';

const ProductPage = ({ addToCart }) => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(5);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${baseURL}/api/products/${id}`);
                if (!response.ok) {
                    throw new Error("Product not found");
                }
                const data = await response.json();
                setProduct(data);
                setReviews(data.reviews || []);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddReview = async () => {
        if (!user) {
            alert("You must be logged in to add a review.");
            return;
        }

        if (!reviewText.trim()) {
            alert("Please enter a review.");
            return;
        }

        try {
            const response = await fetch(`${baseURL}/api/products/${id}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user, // Assuming user context contains user ID
                    text: reviewText,
                    rating,
                }),
            });

            if (response.ok) {
                const newReview = await response.json();

                // Update reviews state dynamically
                setReviews((prevReviews) => [
                    ...prevReviews,
                    { ...newReview, createdAt: newReview.createdAt || new Date().toISOString() },
                ]);
                setReviewText('');
                setRating(5); // Reset rating
            } else {
                console.error("Failed to submit review");
            }
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    };

    if (loading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (!product) return <p className="text-center text-gray-500">Product not found</p>;

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row transition transform hover:scale-105 duration-200">
                <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-100">
                    <img src={product.image} alt={product.name} className="rounded-md max-w-full h-auto" />
                </div>
                <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
                        <p className="text-2xl text-green-500 font-semibold mb-2">{`$${product.price} ${product.currency}`}</p>
                        <p className="text-gray-700 mt-2 mb-6 text-sm">{product.description}</p>
                        <p className="text-gray-600 text-sm"><span className="font-semibold">Farmer:</span> {product.farmer_id}</p>
                        <p className="text-gray-600 text-sm"><span className="font-semibold">Location:</span> {product.location}</p>
                        <p className="text-gray-600 text-sm"><span className="font-semibold">Stock:</span> {product.stock} {product.unit}</p>
                        <p className="text-gray-600 text-sm"><span className="font-semibold">Harvest Date:</span> {new Date(product.harvest_date).toLocaleDateString()}</p>
                        <p className="text-gray-600 text-sm"><span className="font-semibold">Shipping Cost:</span> ${product.shipping_cost}</p>
                        <p className="text-gray-600 text-sm"><span className="font-semibold">Category:</span> {product.category}</p>
                        <p className="text-gray-600 text-sm"><span className="font-semibold">Brand:</span> {product.brand}</p>
                        <p className="text-gray-600 text-sm"><span className="font-semibold">Rating:</span> {product.rating} <span className="text-xs text-yellow-500">★</span> ({product.numReviews} reviews)</p>
                        
                        <div className="mt-4">
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">Specifications</h2>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {Object.entries(product.specifications || {}).map(([key, value]) => (
                                    <li key={key} className="text-sm text-gray-700 bg-gray-100 p-2 rounded-md">
                                        <span className="font-semibold">{key}:</span> {value}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <button
                        className="mt-6 w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none transition-all duration-150 shadow-lg transform hover:-translate-y-1"
                        onClick={() => addToCart(product)}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Reviews</h2>
                <ul className="space-y-4">
                    {reviews.length > 0 ? (
                        reviews.map((review, index) => (
                            <li key={index} className="p-4 bg-gray-100 rounded-md shadow-md">
                                <p className="text-sm text-gray-600">{review.text}</p>
                                <p className="text-sm text-yellow-500">Rating: {review.rating} ★</p>
                                <p className="text-sm text-gray-400">
                                    {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'Unknown date'}
                                </p>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-600">No reviews yet. Be the first to write one!</p>
                    )}
                </ul>
            </div>

            {/* Add Review Section */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Write a Review</h2>
                <textarea
                    className="w-full p-3 border rounded-md mb-4"
                    placeholder="Write your review here..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                />
                <div className="flex items-center space-x-4">
                    <label className="text-sm font-medium">Rating:</label>
                    <select
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        className="p-2 border rounded-md"
                    >
                        {[1, 2, 3, 4, 5].map((r) => (
                            <option key={r} value={r}>
                                {r} ★
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    className="mt-4 px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none transition-all duration-150 shadow-lg transform hover:-translate-y-1"
                    onClick={handleAddReview}
                >
                    Submit Review
                </button>
            </div>
        </div>
    );
};

export default ProductPage;
