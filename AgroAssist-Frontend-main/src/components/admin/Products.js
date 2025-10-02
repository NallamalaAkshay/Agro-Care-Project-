import React, { useState, useEffect } from 'react';
import './styles.css';
import AddProductModal from './AddProductModal';
import ModifyProductModal from './ModifyProductModal';
import { baseURL } from '../../lib';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '', stock: '' });
  const [search, setSearch] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modifyModalIsOpen, setModifyModalIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${baseURL}/api/products`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const openModifyModal = (product) => {
    setSelectedProduct(product);
    setNewProduct(product); // Pre-fill the form with the selected product's data
    setModifyModalIsOpen(true);
  };

  const closeModifyModal = () => {
    setModifyModalIsOpen(false);
    setNewProduct({ name: '', price: '', category: '', stock: '' });
    setSelectedProduct(null);
  };

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category || !newProduct.stock) {
      setError('All fields are required.');
      return;
    }
    try {
      const response = await fetch(`${baseURL}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });
      const addedProduct = await response.json();
      setProducts([...products, addedProduct]);
      setNewProduct({ name: '', price: '', category: '', stock: '' });
      setError('');
      setModalIsOpen(false);
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  const handleSaveChanges = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category || !newProduct.stock) {
      setError('All fields are required.');
      return;
    }
    try {
      const response = await fetch(`${baseURL}/api/products/${selectedProduct._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });
      const updatedProduct = await response.json();
      setProducts(products.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      ));
      closeModifyModal();
      window.location.reload();
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await fetch(`${baseURL}/api/products/${productId}`, {
        method: 'DELETE',
      });
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };


  const handleSearchChange = (e) => setSearch(e.target.value.toLowerCase());

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search) ||
      product.price.toString().includes(search) ||
      product.stock.toString().includes(search)
  );

  return (
    <div className="products-container">
      {/* <h2 className="section-title">Product List</h2> */}
      {/* <input type="file" onChange={handleCSVUpload} className="csv-upload" /> */}
      
      <div className="search-form">
        <div className="search-tab">
          <input
            type="text"
            placeholder="Search item ..."
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        
        <div className="add-product-form">
          <button onClick={openModal} className="btn add-btn">Add Product</button>
        </div>
      </div>

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        newProduct={newProduct}
        setNewProduct={setNewProduct}
        handleAddProduct={handleAddProduct}
      />

      {/* Modify Product Modal */}
      <ModifyProductModal
        isOpen={modifyModalIsOpen}
        closeModal={closeModifyModal}
        product={newProduct}
        setProduct={setNewProduct}
        handleSaveChanges={handleSaveChanges}
      />

      {error && <p className="error-message">{error}</p>}

      <table className="products-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <tr key={product._id || index}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>{product.stock}</td>
              <td>
                <button onClick={() => handleDeleteProduct(product._id)} className="btn delete-btn">Delete</button>
                <button onClick={() => openModifyModal(product)} className="btn modify-btn">Modify</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
