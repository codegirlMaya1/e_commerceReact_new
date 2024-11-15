import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import this to use `toBeInTheDocument`
import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider, useCart } from './CartContext';
import Cart from './Cart';

const AddToCartButton = ({ product }) => {
  const { dispatch } = useCart();

  return (
    <button onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}>
      Add to Cart
    </button>
  );
};

describe('Cart Component', () => {
  it('displays an empty cart message when there are no items', () => {
    render(
      <CartProvider>
        <Router>
          <Cart />
        </Router>
      </CartProvider>
    );

    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
  });

  it('displays items in the cart', () => {
    const product1 = { id: 1, name: 'Product 1', price: 10 };
    const product2 = { id: 2, name: 'Product 2', price: 20 };

    render(
      <CartProvider>
        <Router>
          <Cart />
          <AddToCartButton product={product1} />
          <AddToCartButton product={product2} />
        </Router>
      </CartProvider>
    );

    const addToCartButtons = screen.getAllByText('Add to Cart');
    fireEvent.click(addToCartButtons[0]); // Add Product 1
    fireEvent.click(addToCartButtons[1]); // Add Product 2

    expect(screen.getByText('Product 1 - $10')).toBeInTheDocument();
    expect(screen.getByText('Product 2 - $20')).toBeInTheDocument();
    expect(screen.getByText('Total: $30.00')).toBeInTheDocument();
  });

  it('removes an item from the cart', () => {
    const product1 = { id: 1, name: 'Product 1', price: 10 };
    const product2 = { id: 2, name: 'Product 2', price: 20 };

    render(
      <CartProvider>
        <Router>
          <Cart />
          <AddToCartButton product={product1} />
          <AddToCartButton product={product2} />
        </Router>
      </CartProvider>
    );

    const addToCartButtons = screen.getAllByText('Add to Cart');
    fireEvent.click(addToCartButtons[0]); // Add Product 1
    fireEvent.click(addToCartButtons[1]); // Add Product 2

    // Remove the first item
    fireEvent.click(screen.getAllByText('Remove')[0]);

    expect(screen.queryByText('Product 1 - $10')).not.toBeInTheDocument();
    expect(screen.getByText('Product 2 - $20')).toBeInTheDocument();
    expect(screen.getByText('Total: $20.00')).toBeInTheDocument();
  });
});