import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { baseURL } from '../lib';
import Slider from 'react-slick'; // React Slick for carousel
import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";// Slick Carousel Theme

const ProductList = ({ addToCart }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [topRatedProducts, setTopRatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [priceRange, setPriceRange] = useState('all');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [categories, setCategories] = useState([]);
    const [priceRanges, setPriceRanges] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${baseURL}/api/products`);
                const data = await response.json();
                setProducts(data);
                setFilteredProducts(data);

                // Extract unique categories
                const uniqueCategories = [...new Set(data.map((product) => product.category))];
                setCategories(uniqueCategories);

                // Generate price ranges
                const prices = data.map((product) => product.price);
                const minPrice = Math.floor(Math.min(...prices));
                const maxPrice = Math.ceil(Math.max(...prices));
                const range = maxPrice - minPrice;
                const step = Math.ceil(range / 4); // Create 4 price ranges

                const ranges = [];
                for (let i = minPrice; i < maxPrice; i += step) {
                    ranges.push({
                        id: `${i}-${i + step}`,
                        min: i,
                        max: i + step,
                        label: `$${i} - $${i + step}`,
                    });
                }
                setPriceRanges(ranges);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchTopRatedProducts = async () => {
            try {
                const response = await fetch(`${baseURL}/api/top-rated`);
                const data = await response.json();
                setTopRatedProducts(data);
            } catch (error) {
                console.error('Error fetching top-rated products:', error);
            }
        };

        fetchProducts();
        fetchTopRatedProducts();
    }, []);

    useEffect(() => {
        filterProducts();
    }, [priceRange, selectedCategory]);

    const filterProducts = () => {
        let filtered = [...products];

        if (selectedCategory !== 'all') {
            filtered = filtered.filter((product) => product.category === selectedCategory);
        }

        if (priceRange !== 'all') {
            const [min, max] = priceRange.split('-').map(Number);
            filtered = filtered.filter(
                (product) => product.price >= min && product.price <= max
            );
        }

        setFilteredProducts(filtered);
    };

    // Slick Carousel settings
    const carouselSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="product-list-container">
            <div className="filter-section mb-8">
                <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="filter-dropdown"
                >
                    <option value="all">All Prices</option>
                    {priceRanges.map((range) => (
                        <option key={range.id} value={range.id}>
                            {range.label}
                        </option>
                    ))}
                </select>

                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="filter-dropdown"
                >
                    <option value="all">All Categories</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            <div className="top-rated-section mb-12">
                <h2 className="section-title text-2xl font-bold text-gray-800 mb-4">Top Rated Products</h2>
                <Slider {...carouselSettings}>
                    {topRatedProducts.length > 0 ? (
                        topRatedProducts.map((product) => (
                            <ProductCard key={product._id} product={product} addToCart={addToCart} />
                        ))
                    ) : (
                        <p className="no-products-text">No top-rated products available.</p>
                    )}
                </Slider>
            </div>

            <div className="all-products-section">
                <h2 className="section-title text-2xl font-bold text-gray-800 mb-4">All Products</h2>
                <div className="products-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        <p className="loading-text">Loading products...</p>
                    ) : filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <ProductCard key={product._id} product={product} addToCart={addToCart} />
                        ))
                    ) : (
                        <p className="no-products-text">No products match the selected filters</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductList;
