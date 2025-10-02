import React, { useState } from 'react';
import Modal from 'react-modal';
import { baseURL } from '../../lib';

const AddProductModal = ({ isOpen, closeModal, newProduct, setNewProduct, fetchProducts }) => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // Success message state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    // setError(''); // Clear previous error
    setSuccess(''); // Clear previous success message

    try {
      const response = await fetch(`${baseURL}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add product');
      }
      if(response.ok){

        window.location.reload();

      }

      setSuccess('Product added successfully!'); // Set success message

      // Reset form fields
      setNewProduct({
        name: '',
        description: '',
        price: '',
        currency: 'USD',
        farmer_id: '',
        location: '',
        stock: '',
        unit: '',
        harvest_date: '',
        category: '',
        image: '',
        brand: '',
      });

      fetchProducts(); // Refresh product list

    } catch (error) {
      console.error('Error adding product:', error);
      setError(error);
      // setError(error.message || 'An error occurred while adding the product.');
    }
  };

  const handleClose = () => {
    closeModal();
    // setError('');
    setSuccess(''); // Clear success message when closing the modal
  };

  return (
    <Modal 
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="Add Product Modal"
      className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl mx-auto overflow-y-auto max-h-[90vh] relative"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center py-12"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add New Product</h2>
      
      <form onSubmit={handleAddProduct} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newProduct.description}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price ($)"
          value={newProduct.price}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="text"
          name="currency"
          placeholder="Currency (e.g., USD)"
          value={newProduct.currency || 'USD'}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          name="farmer_id"
          placeholder="Farmer ID"
          value={newProduct.farmer_id}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={newProduct.location}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={newProduct.stock}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="text"
          name="unit"
          placeholder="Unit (e.g., kg, lbs)"
          value={newProduct.unit}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="date"
          name="harvest_date"
          placeholder="Harvest Date"
          value={newProduct.harvest_date || ''}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={newProduct.category}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={newProduct.brand}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        {success && <p className="text-green-500 text-sm text-center mt-4">{success}</p>}
        {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
        
        <div className="flex items-center justify-center space-x-4 mt-6">
          <button 
            type="submit" 
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Add Product
          </button>
          <button 
            type="button" 
            onClick={handleClose} 
            className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-300"
          >
            Close
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddProductModal;
