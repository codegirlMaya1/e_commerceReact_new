import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import axios from 'axios';

const AllProducts = () => {
  const [products, setProducts] = useState([
    { id: 'initial-1', name: 'Product 1', description: 'Description 1', price: '10', quantity: '1' }
  ]);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', quantity: '' });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get('/api/products')
      .then(response => setProducts(prevProducts => [...prevProducts, ...response.data]))
      .catch(error => console.error('Error fetching products:', error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/products', newProduct)
      .then(response => {
        setProducts(prevProducts => [...prevProducts, response.data]);
        setNewProduct({ name: '', description: '', price: '', quantity: '' });
      })
      .catch(error => console.error('Error adding product:', error));
  };

  const deleteProduct = (id) => {
    axios.delete(`/api/products/${id}`)
      .then(() => {
        setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
      })
      .catch(error => console.error('Error deleting product:', error));
  };

  return (
    <div>
      <h1>All Products</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newProduct.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newProduct.description}
          onChange={handleChange}
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleChange}
        />
        <input
          type="text"
          name="quantity"
          placeholder="Quantity"
          value={newProduct.quantity}
          onChange={handleChange}
        />
        <button type="submit">Add Product</button>
      </form>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          deleteProduct={() => deleteProduct(product.id)}
        />
      ))}
    </div>
  );
};

export default AllProducts;
