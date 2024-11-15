import React from 'react';
import { render, fireEvent, waitFor, act, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import this to use `toBeInTheDocument`
import axios from 'axios';
import AllProducts from '../../components/AllProducts';// Adjusted import path
import ProductCard from '../../components/ProductCard';

jest.mock('axios');

describe('AllProducts Component', () => {
  it('fetches and displays products', async () => {
    const products = [
      { id: 1, name: 'Product 1', description: 'Description 1', price: '10', quantity: '1' },
      { id: 2, name: 'Product 2', description: 'Description 2', price: '20', quantity: '2' },
    ];
    axios.get.mockResolvedValue({ data: products });

    await act(async () => {
      render(<AllProducts />);
    });

    await waitFor(() => {
      expect(screen.getAllByText('Product 1').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Product 2').length).toBeGreaterThan(0);
    });
  });

  it('adds a new product', async () => {
    const newProduct = { id: 3, name: 'Product 3', description: 'Description 3', price: '30', quantity: '3' };
    axios.post.mockResolvedValue({ data: newProduct });

    await act(async () => {
      render(<AllProducts />);
    });

    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Product 3' } });
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Description 3' } });
    fireEvent.change(screen.getByPlaceholderText('Price'), { target: { value: '30' } });
    fireEvent.change(screen.getByPlaceholderText('Quantity'), { target: { value: '3' } });

    fireEvent.click(screen.getByText('Add Product'));

    await waitFor(() => {
      expect(screen.getByText('Product 3')).toBeInTheDocument();
    });
  });
});

describe('ProductCard Component', () => {
  it('renders product details', () => {
    const product = { id: 1, name: 'Product 1', description: 'Description 1', price: '10', quantity: '1' };
    const { getByText } = render(<ProductCard product={product} />);

    expect(getByText('Product 1')).toBeInTheDocument();
    expect(getByText('Description 1')).toBeInTheDocument();
    expect(getByText('$10')).toBeInTheDocument();
    expect(getByText('Quantity: 1')).toBeInTheDocument();
  });

  it('calls deleteProduct when delete button is clicked', () => {
    const product = { id: 1, name: 'Product 1', description: 'Description 1', price: '10', quantity: '1' };
    const deleteProduct = jest.fn();
    const { getByText } = render(<ProductCard product={product} deleteProduct={deleteProduct} />);

    fireEvent.click(getByText('Delete'));

    expect(deleteProduct).toHaveBeenCalledWith(1);
  });
});